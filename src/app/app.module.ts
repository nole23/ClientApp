import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScrollEventModule } from 'ngx-scroll-event';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NpnSliderModule } from "npn-slider";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './guard/auth.guard';
import { TokenService } from './guard/token.service';
import { TokenInterceptor } from './guard/token.interceptor';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/anuth/login/login.component';
import { RegistrationComponent } from './components/anuth/registration/registration.component';
import { RestartComponent } from './components/anuth/restart/restart.component';
import { VerifyComponent } from './components/anuth/verify/verify.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { PublicationComponent } from './components/plagin/publication/publication.component';
import { FriendsComponent } from './components/plagin/friends/friends.component';
import { ImagesComponent } from './components/plagin/images/images.component';
import { SettingsProfileComponent } from './components/settings-profile/settings-profile.component';
import { NotificationComponent } from './components/notification/notification.component';
import { LocationComponent } from './components/plagin/location/location.component';
import { ProfileImagesComponent } from './components/plagin/modal/profile-images/profile-images.component';
import { UpdateProfilImageComponent } from './components/plagin/modal/update-profil-image/update-profil-image.component';
import { AddLocationComponent } from './components/plagin/modal/add-location/add-location.component';
import { AddPictureComponent } from './components/plagin/modal/add-picture/add-picture.component';
import { PublicationImageComponent } from './components/plagin/modal/publication-image/publication-image.component';
import { ProfilFriendsComponent } from './components/profil-friends/profil-friends.component';
import { PublicationShowDeleteComponent } from './components/plagin/modal/publication-show-delete/publication-show-delete.component';
import { AddTextComponent } from './components/plagin/modal/add-text/add-text.component';
import { DeleteFriendsComponent } from './components/plagin/modal/delete-friends/delete-friends.component';
import { ImageGalleryComponent } from './components/plagin/modal/image-gallery/image-gallery.component';
import { SocketService } from './services/socket.service';
import { ChatComponent } from './components/chats/chat/chat.component';
import { ListUsersChatComponent } from './components/plagin/list-users-chat/list-users-chat.component';
import { ChatAreaComponent } from './components/plagin/chat-area/chat-area.component';
import { ListNotificationComponent } from './components/plagin/list-notification/list-notification.component';
import { ListNotificationVisitorComponent } from './components/plagin/list-notification-visitor/list-notification-visitor.component';
import { ChatMobileComponent } from './components/chats/chat-mobile/chat-mobile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    RegistrationComponent,
    RestartComponent,
    VerifyComponent,
    ProfileComponent,
    SearchComponent,
    PublicationComponent,
    FriendsComponent,
    ImagesComponent,
    SettingsProfileComponent,
    NotificationComponent,
    LocationComponent,
    ProfileImagesComponent,
    UpdateProfilImageComponent,
    AddLocationComponent,
    AddPictureComponent,
    PublicationImageComponent,
    ProfilFriendsComponent,
    PublicationShowDeleteComponent,
    AddTextComponent,
    DeleteFriendsComponent,
    ImageGalleryComponent,
    ChatComponent,
    ListUsersChatComponent,
    ChatAreaComponent,
    ListNotificationComponent,
    ListNotificationVisitorComponent,
    ChatMobileComponent,
    NotFoundComponent
  ],
  imports: [
    NotifierModule.withConfig(customNotifierOptions),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ScrollEventModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NpnSliderModule
  ],
  providers: [
    AuthGuard,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    SocketService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProfileImagesComponent,
    UpdateProfilImageComponent,
    AddLocationComponent,
    AddPictureComponent,
    PublicationImageComponent,
    PublicationShowDeleteComponent,
    AddTextComponent,
    DeleteFriendsComponent,
    ImageGalleryComponent,
    ChatMobileComponent
  ]
})
export class AppModule { }
