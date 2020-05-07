import { Component, OnInit, ViewChild, ElementRef, HostListener } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { User } from "../../../models/user";
import { ChatService } from "../../../services/chat.service";
import { Global } from "../../../global/global";
import { SocketService } from '../../../services/socket.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  @ViewChild('message') message: ElementRef;
  @ViewChild('scrollMe') scrollMe: ElementRef;
  eventsSubject: Subject<any> = new Subject<any>();
  eventsEditNewMessage: Subject<void> = new Subject<void>();

  private readonly notifier: NotifierService;

  isOnline: Boolean;
  listChater: any;
  isMobile: Boolean;
  messages: any;
  textMessage: any;
  me: User;
  isTyping: Boolean;
  onTyping: Boolean;
  isSpiner: Boolean;
  idOpenUser: any;
  chater: any;
  status: any;
  isSmileShow: Boolean;
  listSmile: any;
  testText: String;
  nameChater: any;
  countFokus: any;
  scrolltop: number = null;
  scrollBottomNumber: any;
  timer: any;
  isLoadNewData: Boolean;
  linkImage: any;
  isSeen: Boolean;
  lastMessage: any;
  constructor(
    notifier: NotifierService,
    private chatService: ChatService,
    private global: Global,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,
    private clientService: ClientService
  ) {
    this.isOnline = true;
    this.listChater = null;
    this.isMobile = false;
    this.messages = null;
    this.textMessage = '';
    this.notifier = notifier;
    this.me = JSON.parse(localStorage.getItem('user'));
    this.isTyping = false;
    this.onTyping = false;
    this.isSpiner = false;
    this.idOpenUser = null;
    this.chater = null;
    this.status = null;
    this.isSmileShow = false;
    this.listSmile = null;
    this.testText = '';
    this.nameChater = [];
    this.countFokus = 0;
    this.isLoadNewData = false;
    this.isSeen = false;
    this.lastMessage = null;
    this.global.chatChomponentSocketMessage$.subscribe(res => {
      this.isSeen = false;
      this.editSocketMessage(res);
    });
    this.global.chatChomponentSocketTyping$.subscribe(res => {
      this.getTyping(res);
    });
    this.global.chatChomponentSocketIsOnline$.subscribe(res => {
      this.isOnlineUser(res);
    });
    this.global.chatChomponentSocketShowMessage$.subscribe(res => {
      this.showMessage(res);
    });
  }

  ngOnInit() {
    this.getAllChater();
    this.getAllsmile();
    this.global.setSidebar('chat');
  }

  getTyping(data: any) {
    if (this.chater !== null) {
      if (data.chater.toString() === this.chater._id.toString()) {
        this.setTyping(true);
      }
    }
  }

  isOnlineUser(data: any) {
    this.chatService.setOnlineUser(data);
  }

  showMessage(data: any) {
    let jsonData = JSON.parse(data);
    if (jsonData._id.toString() !== this.me._id.toString()) {
      this.isSeen = true;
    }
  }

  editSocketMessage(resData: any) {
    if (this.messages !== null) {

      if (this.chater !== null) {

        if (this.chater._id.toString() === resData.chat._id.toString()) {

          let lastChat = this.messages[this.messages.length - 1]
          let newChat = this.chatService.setNewChat(resData.message.text, resData.message._id);

          if (lastChat.isMe) {
            let user = resData.chat.participants.find(x => x._id.toString() === resData.message.author.toString());
            
            let object = {
              user: user,
              isMe: false,
              message: []
            }
            
            object.message.push(newChat.text);
            if (newChat.linkText) {
              object.message.push(newChat.imgSave);
            }
      
            this.messages.push(object);
          } else {
            if (this.messages[this.messages.length - 1].message[this.messages[this.messages.length - 1].message.length - 1].isBgs) {
              this.messages[this.messages.length - 1].message[this.messages[this.messages.length - 1].message.length - 1].isBottom = true;
            }
      
            this.messages[this.messages.length - 1].message.push(newChat.text);
            if (newChat.linkText) {
              this.messages[this.messages.length - 1].message.push(newChat.imgSave);
            }
          }
          this.setScroll();
          // this.scrollBottomNumber = this.scrollMe.nativeElement.scrollHeight;
          this.global.setNullOfMessage(this.chater._id);
        } else {
          this.eventsEditNewMessage.next(resData.chat._id)
        }
      }
    } else {
      this.eventsEditNewMessage.next(resData.chat._id)
    }

    let testiram = this.listChater.map(function(x) {return x._id; }).indexOf(resData.chat._id);
    this.setListChater(this.listChater[testiram], resData.message.text);
  }

  getAllsmile() {
    this.listSmile = this.global.smile['smile']
  }

  setSmile(smile: String) {
    let simbol = this.global.getIndexSmile(smile);
    if (this.textMessage.length !== 0) {
      this.textMessage += ' ' + simbol + ' ';
    } else {
      this.textMessage += simbol;
    }
    
  }

  getAllChater() {
    this.listChater = this.chatService.getListChater();
    if (this.listChater.length === 0) {
      this.chatService.getAllChater().subscribe(res => {
        this.listChater = res['message'];
        this.getActivateRoute();
      })
    } else {
      this.getActivateRoute();      
    }
  }

  getActivateRoute() {
    setTimeout(() => {
      this.activatedRoute.params.subscribe(res =>{
        this.getItem(res['id']);
      });
    }, 10);
  }

  getItem(id: any) {
    let i = null;
    if (id !== 'list-user') {
      let item = null;
      this.listChater.forEach((element: any, index: any) => {
        if (element._id.toString() === id.toString()) {
          item = element;
          i = index;
        }
      });

      this.openChat(item, i, false);
    } else {
      this.destroy();
    }
  }

  opneSmile() {
    this.linkImage = this.global.linkClient;
    if (!this.isSmileShow) {
      this.message.nativeElement.children['chat-area'].querySelector('#style-4').classList.add('h-chat-area-open-smile')
    } else {
      this.message.nativeElement.children['chat-area'].querySelector('#style-4').classList.remove('h-chat-area-open-smile')
    }
    this.isSmileShow = !this.isSmileShow;
    this.setScroll();
  }

  closeSmile() {
    if (this.isSmileShow) {
      this.opneSmile(); 
    }
  }

  onEmitListUserChat(data: any) {
    if (!(data.item === this.chater)) {
      this.destroy();
      this.openChat(data['item'], data['i'], data['status'])
    } else {

    }
  }

  openChat(item: any, i: any, isRedirec: Boolean) {
    if (isRedirec) {
      this.router.navigate(['chat/' + item._id])
    } else {
      this.setChat(item, i);
    }
  }

  setChat(item: any, i: any) {
    this.isMobile = (window.outerWidth < 769);

    this.message.nativeElement.children['chat-area'].classList.remove('mobile-hide');
    this.message.nativeElement.children['sidebar'].querySelector('#item-user-' + item._id).classList.add('bg-profil')

    if (this.idOpenUser !== null) {
      this.message.nativeElement.children['sidebar'].querySelector('#item-user-' + this.idOpenUser).classList.remove('bg-profil')
    }

    if (item.message.length === 0) {
      this.messages = []
    } else {
      this.chatService.getAllMessageOneChat(item, 0).subscribe(res => {
        if (res['message'] !== undefined || res['message'] === null) {
          this.messages = res['message'];
          item['page'] = (res['page'] + 1)

          if (this.messages.length > 0) {
            this.lastMessage = this.messages[this.messages.length -1]
            if (this.lastMessage.isMe) {
              this.setIsViewLastMessage();
            }
          }
          setTimeout(() => {
            // this.scrollBottomNumber = this.scrollMe.nativeElement.scrollHeight;
            this.setScroll();
          }, 50);
        }
      }) 
    }
    this.idOpenUser = item._id;
    this.chater = item;
    this.nameChater = [];

    this.chater.participants.forEach((element: any) => {
      if (element._id.toString() !== this.me._id.toString()) {
        this.nameChater.push(element);
      }
    });

    this.global.setNullOfMessage(item._id);
  }

  setIsViewLastMessage() {
    let listViewUser = this.lastMessage.message[this.lastMessage.message.length - 1].listViewUser;
    let index = listViewUser.indexOf(this.me._id.toString());
    if (index !== -1) {
      if (listViewUser.length > 1) {
        this.isSeen = true;
      }
    }
  }

  setTyping(status: Boolean) {
    this.onTyping = status;
    this.isTyping= status;
    clearTimeout(this.timer);
    if (status) {
      this.timer = setTimeout(() => {this.setTyping(false) },1000);
    }
  }

  sendMessage() {
    this.closeSmile();
    this.isSpiner = true;
    this.isTyping = true;

    if (this.textMessage.length > 0) {
      let text = this.textMessage; 
      this.chatService.sendMessage(this.chater, this.textMessage).subscribe(res => {
        this.setMessigPrivate(res['message'], res['data']);
        this.setListChater(this.chater, text);
        this.isSeen = false;
      });
      this.textMessage = '';
      this.global.setNullOfMessage(this.chater._id)
    } else {
      this.isSpiner = false;
      this.isTyping = false;
    }
  }

  setListChater(chater: any, text: String) {
    let foundIndex = this.listChater.indexOf(chater)
    this.listChater[foundIndex].dateOfCreate = new Date;
    this.listChater[foundIndex].message.text = text;
    this.listChater.sort(function(a: any, b: any) {
      return new Date(b.dateOfCreate).getTime() - new Date(a.dateOfCreate).getTime()
    })
  }

  setMessigPrivate(res: any, newText: any) {
    if (res) {
      let index = this.messages.length > 0 ? this.messages.length - 1 : null;

      var object = {
        user: this.me,
        isMe: true,
        message: []
      }

      let newChat = this.chatService.setNewChat(newText.text, newText._id);

      if (index !== null) {
        if (this.messages[index].isMe) {
          if (this.messages[index].message[this.messages[index].message.length - 1].isBgs) {
            this.messages[index].message[this.messages[index].message.length - 1].isBottom = true;
          }
        }
      }

      if (index !== null) {
        if (this.messages[index].isMe) {
          this.messages[index].message.push(newChat.text)
          if (newChat.linkText) {
            this.messages[index].message.push(newChat.imgSave);
          }
        } else {
          object.message.push(newChat.text);
          if (newChat.linkText) {
            object.message.push(newChat.imgSave);
          }

          this.messages.push(object)
        }
      } else {
        object.message.push(newChat.text);
        if (newChat.linkText) {
          object.message.push(newChat.imgSave);
        }
        this.messages.push(object)
      }
  
    } else {
      this.notifier.notify('error', 'Poruka nije poslata, pokusajte ponovo');
    }
    
    this.isSpiner = false;
    this.isTyping = false;
    this.lastMessage = this.messages[this.messages.length -1]
    this.setScroll();
  }

  closeChat() {
    this.destroy();
    this.isMobile = !this.isMobile;
    this.message.nativeElement.children['chat-area'].classList.add('mobile-hide');
    this.router.navigate(['chat/list-user'])
  }

  mouseFokus() {
    this.countFokus += 1;
    
    if ( this.countFokus === 35) {
      this.setShowMessage();
    } else if (this.countFokus === 250) {
      if (this.countFokus > 1) {
        this.countFokus = 0;
      }
      this.setShowMessage();
    }
  }

  setShowMessage() {
    if (this.chater !== null) {
      this.chatService.shetNotShowMessage(this.chater, true).subscribe(res => {
        this.eventsSubject.next(this.chater);
      })
    }
  }

  typing() {
    this.socketService.emitTyping(this.chater, this.nameChater);
  }

  onScroll(event: any) {
    if (event.srcElement.scrollTop < 150) {
      if (!this.isLoadNewData) {
        this.isLoadNewData = true;
        this.loadLastChat(event);
      }
    }
  }

  loadLastChat(event: any) {
    if (this.messages !== null) {
      if (this.messages.length > 0) {
        let newPosition = event.srcElement.offsetHeight + event.srcElement.scrollTop + 25;
        this.chatService.getAllMessageOneChat(this.chater, this.chater['page']).subscribe(res=> {
          if (res['message'].length !== 0) {
            this.chater.page = (res['page'] + 1);
            res['message'].forEach((element: any) => {
              this.messages.unshift(element)
            });
            this.isLoadNewData = false;
            this.scrollBottomNumber = newPosition;
          }
        })
      }
    }
  }

  setScroll() {
    this.scrollBottomNumber = this.scrollMe.nativeElement.offsetHeight + 25;
  }

  destroy() {
    this.closeSmile();

    this.isOnline = true;
    this.isMobile = false;
    this.messages = null;
    this.textMessage = '';
    this.isTyping = false;
    this.onTyping = false;
    this.isSpiner = false;
    this.chater = null;
    this.status = null;
    this.isSmileShow = false;
    this.listSmile = null;
    this.testText = '';
    this.nameChater = [];
    this.countFokus = 0;
    this.isLoadNewData = false;
    this.isSeen = false;
    this.lastMessage = null;
  }
}
