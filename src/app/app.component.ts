import { Component, OnInit, Inject, LOCALE_ID, ViewChild } from "@angular/core";
import { AuthNav } from "./guard/auth-nav";
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
  toMatch = new RegExp (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i);
  constructor(
    private auth: AuthNav,
    @Inject(LOCALE_ID) public locale: string,
    private global: Global,
    private socketService: SocketService,
    private clientService: ClientService
  ) {
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
    this.global.appComponentLogin$.subscribe(res => {
      this.ngOnInit(true);
    });
    this.global.appComponentLogout$.subscribe(res => {
      this.status();
    })
  }

  ngOnInit(status: Boolean = false) {
    this.socketService.setSocket();
    this.status();

    if (!status) {
      if (this.user !== null) {
        this.socketService.emitStatusOnline();
        this.socketService.setSocketLink();
        this.setNotification(JSON.parse(localStorage.getItem('notification')));
      }
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.socketService.emitStatusOnline();
      this.socketService.setSocketLink();

      this.setNotification(JSON.parse(localStorage.getItem('notification')));
    }
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
    if (item !== null) {
      let i = item.notification.isNotificaton;
      i = i + item.notification.isVisitor;
      i = i + item.relationship;

      if (i > 0) {
        this.btnColorNewInfo = 'green-color';
      } else {
        this.btnColorNewInfo = '';
      }
    }
  }

  removeNotification(status: Boolean) {
    this.setNotification(JSON.parse(localStorage.getItem('notification')));
  }

  ngOpenSideBar() {
    this.child.ngOpenSideBar();
  }
}
