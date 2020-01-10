import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScrollEventModule } from 'ngx-scroll-event';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './guard/auth.guard';
import { TokenService } from './guard/token.service';
import { TokenInterceptor } from './guard/token.interceptor';

import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/anuth/login/login.component';
import { RegistrationComponent } from './components/anuth/registration/registration.component';
import { RestartComponent } from './components/anuth/restart/restart.component';
import { VerifyComponent } from './components/anuth/verify/verify.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PublicationComponent } from './components/plagin/publication/publication.component';
import { FriendsComponent } from './components/plagin/friends/friends.component';
import { ImagesComponent } from './components/plagin/images/images.component';
import { SettingsProfileComponent } from './components/plagin/settings-profile/settings-profile.component';
import { NotificationComponent } from './components/plagin/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    RegistrationComponent,
    RestartComponent,
    VerifyComponent,
    ProfileComponent,
    SearchComponent,
    SettingsComponent,
    PublicationComponent,
    FriendsComponent,
    ImagesComponent,
    SettingsProfileComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ScrollEventModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
