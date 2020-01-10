import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { ChatService } from "../../services/chat.service";
import { Online } from "../../models/online";
import { Global } from "../../global/global";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @ViewChild("list") list: ElementRef;
  @ViewChild("smileRef") smileRef: ElementRef;
  private socket: any;
  private socketStatus: any;

  listChatFriends: [Online];
  chat: any;
  user: User;
  textChat: String;
  notChatText: String;
  indicator: Boolean;
  isOpenChating: Boolean;
  lastActivUser: String;
  numberMessage: any;
  isTyping: Boolean;
  isSendStatus: Boolean;
  listSmile: any;
  listOneListSmile: any;
  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private global: Global
  ) {
    this.socket = io("https://twoway-chatservice.herokuapp.com");
    this.socketStatus = io("https://twoway-statusservice.herokuapp.com");
    this.chat = null;
    this.notChatText = "Zapocnite chat";
    this.indicator = false;
    this.isOpenChating = false;
    this.lastActivUser = null;
    this.numberMessage = 0;
    this.isTyping = false;
    this.isSendStatus = false;
    this.listSmile = this.global.getList();
    this.listOneListSmile = [];
  }

  ngOnInit() {
    console.info("ProfileComponent.ngOnInit() - Data initialization");
    // this._getAllChater();
    this.openListSmile("smile");
    this.user = JSON.parse(localStorage.getItem("user"));
    var numberOfList = 20;
    this.userService.setOnline().subscribe(
      (res: any) => {
        this.listChatFriends = res["message"];

        numberOfList -= this.listChatFriends.length;
        this._getFriends(this.listChatFriends, numberOfList);
      },
      (err: any) => {
        console.log(
          "ProfileComponent.ngOnInit() - Data initialization - twoway-statusservice not recognization"
        );
        this._getFriends(this.listChatFriends, numberOfList);
      }
    );

    // TODO socket
    this.socket.on("chat-" + this.user._id, (data: any) => {
      if (this.chat !== null) {
        this.chat.chatBox.push(data["chatBoxResponse"]);
      }
      this.numberMessage += 1;
      this._setIndicator(
        data["chatBoxResponse"].text._id_sender.username,
        "hide",
        "show"
      );
    });

    // TODO typing
    this.socketStatus.on("typing-" + this.user._id, (data: any) => {
      if (!this.isTyping) this.isTyping = true;
      this.isTyping = true;
      setTimeout(() => {
        this.isTyping = false;
      }, 5000);
    });
  }

  _getFriends(listChat: any, numberOfList: number) {
    this.userService
      .getFriendsByLimit(listChat, numberOfList)
      .subscribe(res => {
        this._editRes(res["users"]);
      });
  }

  _editRes(res: any) {
    res.forEach(element => {
      var edit = new Online({ user: element, device: [] });
      this.listChatFriends.push(edit);
    });
  }

  _setIndicator(username: String, remove: String, add: String) {
    let list = this.list.nativeElement.children["list-user-" + username];
    list.classList.add("bacgraund-hover");
    if (this.lastActivUser !== null && username !== this.lastActivUser) {
      let last = this.list.nativeElement.children[
        "list-user-" + this.lastActivUser
      ];
      last.classList.remove("bacgraund-hover");
    }
    if (list.children.length > 0) {
      list.children[1].classList.remove(remove);
      list.children[1].classList.add(add);

      list.children[0].children[0].classList.remove(remove);
      list.children[0].children[0].classList.add(add);
    }

    this.lastActivUser = username;
  }

  _getChatOneUser(firstFriends: Online) {
    if (firstFriends) {
      this.notChatText = null;
      this.chatService.getChatByUser(firstFriends.user._id).subscribe(res => {
        console.log(res);
      });
    } else {
      this.notChatText = "Zapocnite chat";
    }
  }

  _getAllChater() {
    this.userService.getAllChater().subscribe((res: any) => {
      this.listChatFriends = res;
    });
  }

  sendMessage(event: any) {
    this.smileContextMenu(false);
    let listTyping = [];
    this.chat.listChater.forEach((item: any) => {
      if (item._id.toString() !== this.user._id.toString()) {
        listTyping.push(item);
      }
    });
    // emit typing to server
    this.socketStatus.emit("typing", listTyping);
    if (event.keyCode == 13) {
      this._sendMessage();
    }
  }

  btnSendMessage() {
    this._sendMessage();
  }

  openUserForChat(item: Online) {
    console.info(
      "HomeComponent.openUserForChat() - open chating from " +
        item.user.username
    );
    this._setIndicator(item.user.username, "show", "hide");

    this.isOpenChating = true;
    this.notChatText = "Zapocnite chat";

    this.chatService.setChat(item).subscribe(res => {
      this.isOpenChating = false;
      this.numberMessage = 0;
      if (res["message"].chatBox.length === 0) {
        this.notChatText = null;
        this.chat = {
          _id: res["message"]._id,
          listChater: res["message"].listChater,
          chatBox: []
        };
      } else {
        this.chat = {
          _id: res["message"]._id,
          listChater: res["message"].listChater,
          chatBox: res["message"].chatBox
        };
        this.notChatText = null;
      }
    });
  }

  ngViewMessage(item: any) {
    this._setIndicator(item.text._id_sender.username, "show", "hide");
  }

  _sendMessage() {
    this.smileContextMenu(false);
    this.isSendStatus = true;
    let myMessage = {
      user: this.user,
      text: this.textChat,
      media: null
    };
    this.chatService.pushMessage(this.chat, myMessage).subscribe(res => {
      this.chat.chatBox.push(res["chatBoxResponse"]);
      delete this.textChat;
      this.isSendStatus = false;
    });
  }

  openListSmile(item: any) {
    this.listOneListSmile = this.global.getFunction(item);
  }

  smileContextMenu(status: Boolean) {
    let context = this.smileRef.nativeElement.children[0].classList;
    if (context[1] === "hide" && status) {
      context.remove("hide");
      context.add("show");
    } else if (context[1] === "show" && status) {
      context.remove("show");
      context.add("hide");
    } else if (!status) {
      context.remove("show");
      context.add("hide");
    }
  }

  selectSmile(item: any) {
    this.textChat += this.global._setSmile(item);
  }

  replaceLineBreak(s: string) {
    return this.global.ngReplice(s);
  }

  statusUpate(user: User) {
    console.log(
      "HomeComponent.openUserForChat() - edit status online/offline for user: " +
        user.username
    );
    // TODO Ovde treba izvuci clasu koja daje crvenu boju indikatoru online
    // i zamjeniti ga indikatorom online/offline
    let list = this.list.nativeElement.children["list-user-" + user.username];
    console.log(list);
  }
}
