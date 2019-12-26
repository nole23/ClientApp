import { Component, OnInit, Inject, LOCALE_ID, ViewChild  } from '@angular/core';
import { AuthNav } from './guard/auth-nav';
import * as io from 'socket.io-client';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Global } from './global/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(SidebarComponent) child;

  private socket: any;

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
  btnColorNewMessage: String;
  btnColorNewInfo: String;
  constructor(private auth: AuthNav, @Inject(LOCALE_ID) public locale: string, private global: Global) {
    this.socket = io('https://twoway-chatservice.herokuapp.com');
    
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
    this.picture = '../assets/picture/bg-01.jpg';
    this.title = 'Ulogujte se';
    this.btnColorNewFriend = '';
    this.btnColorNewMessage = '';
    this.btnColorNewInfo = '';
    this.user = null;
  }

  ngOnInit() {
    this.status();

    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user !== null) {
      this.socket.on('chat-' + this.user._id, (data: any) => {
        this._playAudio();
      })
    }
  }

  _playAudio() {
    let audio = new Audio();
    audio.src = '../assets/sonds/insight.mp3';
    audio.load();
    audio.play();
    this.btnColorNewMessage = 'green-color'
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
    this.verify = event['status'];
    this.restart = !event['status'];
    this.email = event['email'];
    this.emailNotFound = false;
  }

  /**
   * 
   * @param event 
   */
  ngOpenClose(event: any) {
    this.loginForm = event;
    this.title = 'Registrujte nalog'
  }

  /**
   * 
   * @param event 
   */
  ngHidenClose(event: any) {
    this.loginForm = event;
    this.restart = false;
    this.title = 'Ulogujte se'
  }

  ngEmailNotCorect(event: any) {
    this.worningRegistrationStatus = event;
  }

  /**
   * 
   * @param event 
   */
  ngLoginStatus(event: any) {
    
    this.loginStatus = event;
    this.loading = !event;
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
    this.title = 'Restartujte sifru'
  }

  ngNotFound(event: any) {
    this.emailNotFound = event;
  }

  ngOpenFirstPage(event: any) {
    this.loginForm = true;
    this.loading = false;
    this.restart = false;
    this.verify = false;
    this.title = 'Ulogujte se';
  }

  ngNotCodeCorect(event: any) {
    this.codeNotValidate = event;
  }

  ngOpenSideBar() {
    this.child.ngOpenSideBar();
  }
}
