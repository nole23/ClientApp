import { Component, OnInit, Inject, LOCALE_ID, ViewChild } from "@angular/core";
import { AuthNav } from "./guard/auth-nav";
import * as io from "socket.io-client";
import { NotifierService } from 'angular-notifier';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { Global } from "./global/global";
import { SocketService } from './services/socket.service';
import { ClientService } from './services/client.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild(SidebarComponent) child;
  private readonly notifier: NotifierService;

  private socket: any;
  private socketLogin: any;

  user: any;
  title: String;
  picture: String;
  loginStatus: Boolean;
  loading: Boolean;
  loginForm: Boolean;
  successStatus: Boolean;
  errorStatus: Boolean;
  worningStatus: Boolean;
  worningRegistrationStatus: Boolean;
  restart: Boolean;
  verify: Boolean;
  emailNotFound: Boolean;
  email: String;
  passwordRestart: Boolean;
  codeNotValidate: Boolean;
  btnColorNewFriend: String;
  btnColorNewInfo: String;
  btnColorChat: String;
  countMessage: any;
  isCount: Boolean;
  statusError: String;
  constructor(
    private auth: AuthNav,
    @Inject(LOCALE_ID) public locale: string,
    private global: Global,
    notifier: NotifierService,
    private socketService: SocketService,
    private clientService: ClientService
  ) {
    this.notifier = notifier;
    this.loading = true;
    this.loginStatus = false;
    this.loginForm = true;
    this.successStatus = false;
    this.errorStatus = false;
    this.worningStatus = false;
    this.restart = false;
    this.verify = false;
    this.worningRegistrationStatus = false;
    this.emailNotFound = false;
    this.passwordRestart = false;
    this.codeNotValidate = false;
    this.picture = "../assets/picture/bg-01.jpg";
    this.title = "Ulogujte se";
    this.btnColorNewFriend = "";
    this.btnColorNewInfo = "";
    this.btnColorChat = 'green-color';
    this.user = JSON.parse(localStorage.getItem("user"));;
    this.statusError = null
    this.countMessage = 0
    this.isCount = false;
    this.global.testComponent$.subscribe(res => {
      this.serviceCall()
    })
    this.global.sidebarComponentRemove$.subscribe(res => {
      this.removeNotification(res);
    });
  }

  ngOnInit(status: Boolean = false) {
    this.clientService.openSmile().subscribe(res => {
      this.global.setLinkClient(res['message']);
    })
    
    this.socketService.setSocket();
    if (!status) {
      this.status();
      if (this.user !== null) {
        this.socketService.emitStatusOnline();

        this.socketService.socket.on("new-message-" + this.user._id, (data: any) => {
          let resData = JSON.parse(data);
          if (resData.message.author.toString() !== this.user._id.toString()) {
            this.global.playAudi();
            this.global.setNumberOfMessage(resData._id)
          }
        })

        this.socketService.socket.on('new-relationship-' + this.user._id, (data: any) => {
          this.global.setNewNotification(data, 'Requester');
        })

        this.socketService.socket.on('new-notification-' + this.user._id, (data: any) => {
          let jsonData = JSON.parse(data)
          this.global.setNewNotification(jsonData.user, jsonData.type);
        })

        this.setNotification(JSON.parse(localStorage.getItem('notification')));
      }
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.socketService.emitStatusOnline();

      this.socketService.socket.on("new-message-" + this.user._id, (data: any) => {
        let resData = JSON.parse(data);
        if (resData.message.author.toString() !== this.user._id.toString()) {
          this.global.playAudi();
          this.global.setNumberOfMessage(resData._id)
        }
      })

      this.setNotification(JSON.parse(localStorage.getItem('notification')));
    }
  }

  serviceCall() {
    let item = this.global.getNumberOfMessage()
    setTimeout(() => {
      this.countMessage = item.length;
      if (this.countMessage > 0) {
        this.isCount = true;
      } else {
        this.isCount = false;
      }
    }, 10)
  }

  setNotification(item: any) {
    let i = item.notification.isNotificaton;
    i = i + item.notification.isVisitor;
    i = i + item.relationship;

    if (i > 0) {
      this.btnColorNewInfo = 'green-color';
    } else {
      this.btnColorNewInfo = '';
    }
  }

  removeNotification(status: Boolean) {
    this.setNotification(JSON.parse(localStorage.getItem('notification')));
  }

  onEmitListUserChat(event: any) {
    // console.log(event)
  }

  status() {
    if (this.auth.canActivate()) {
      this.loginForm = false;
      this.loginStatus = true;
      this.loading = false;
      this.restart = false;
    } else {
      this.loginForm = true;
      this.loginStatus = false;
      this.loading = false;
      this.restart = false;
      this.verify = false;
    }
  }

  ngStatus(event: any) {
    this.verify = event["status"];
    this.restart = !event["status"];
    this.email = event["email"];
    this.emailNotFound = false;
  }

  /**
   *
   * @param event
   */
  ngOpenClose(event: any) {
    this.loginForm = event;
    this.title = "Registrujte nalog";
  }

  /**
   *
   * @param event
   */
  ngHidenClose(event: any) {
    this.loginForm = event;
    this.restart = false;
    this.title = "Ulogujte se";
  }

  ngRegistrationClose(event: any) {
    if (event['message'] === 'LOGIN') {
      this.ngHidenClose(true);
    } else {
      this.statusError = event['message']
    }
  }

  ngEmailNotCorect(event: any) {
    this.worningRegistrationStatus = event;
  }

  /**
   *
   * @param event
   */
  ngLoginStatus(event: any) {
    if (!event.status) {
      this.statusError = event.message;
    } else {
      this.loginStatus = event.status;
      this.loading = !event.status;
      this.ngOnInit(true)
    }
  }

  ngSavePassword(event: any) {
    this.passwordRestart = event;
    this.status();
  }

  /**
   *
   * @param event
   */
  ngEerrorStatus(event: any) {
    this.errorStatus = event;
  }

  /**
   *
   * @param event
   */
  ngStatusProfile(event: any) {
    this.worningStatus = event;
  }

  ngNotActivete(event: any) {
    this.worningStatus = event;
  }

  ngRestartPassword(event: any) {
    this.restart = event;
    this.title = "Restartujte sifru";
  }

  ngNotFound(event: any) {
    this.emailNotFound = event;
  }

  ngOpenFirstPage(event: any) {
    this.loginForm = true;
    this.loading = false;
    this.restart = false;
    this.verify = false;
    this.title = "Ulogujte se";
  }

  ngNotCodeCorect(event: any) {
    this.codeNotValidate = event;
  }

  ngOpenSideBar() {
    this.child.ngOpenSideBar();
  }
}
