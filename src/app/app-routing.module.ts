import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, Router } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';
import { NotLoginGuard } from './guard/not-login.guard';

import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { SettingsProfileComponent } from './components/settings-profile/settings-profile.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProfilFriendsComponent } from './components/profil-friends/profil-friends.component';
import { ChatComponent } from './components/chats/chat/chat.component';
import { ChatMobileComponent } from './components/chats/chat-mobile/chat-mobile.component';
import { LoginComponent } from './components/anuth/login/login.component';
import { RegistrationComponent } from './components/anuth/registration/registration.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RestartComponent } from './components/anuth/restart/restart.component';
import { VerifyComponent } from './components/anuth/verify/verify.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [NotLoginGuard] },
  { path: 'sing-up', component: RegistrationComponent, canActivate: [NotLoginGuard] },
  { path: 'restart-password', component: RestartComponent, canActivate: [NotLoginGuard] },
  { path: 'verify-code', component: VerifyComponent, canActivate: [NotLoginGuard] },
  { path: 'chat/:id', component: ChatComponent, canActivate: [AuthGuard] },
  { path: ':username/:status', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsProfileComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'f/:username/:status', component: ProfilFriendsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

const mobile_routes: Routes = [
  { path: 'chat/:id', component: ChatMobileComponent, canActivate: [AuthGuard] },
  { path: ':username/:status', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsProfileComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'f/:username/:status', component: ProfilFriendsComponent, canActivate: [AuthGuard] }
]

var toMatch = new RegExp (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i);
let application = navigator.userAgent.match(toMatch)

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
  // public constructor(private router: Router) {
  //   if (application) {
  //     router.resetConfig(mobile_routes)
  //   }
  // }

  // private injectModuleRoutes(currentRoutes: Routes, routesToInject: Routes, childNameToReplaceRoutesUnder: string): void {
  //   for (let i = 0; i < currentRoutes.length; i++) {
  //     if (currentRoutes[i].loadChildren != null &&
  //       currentRoutes[i].loadChildren.toString().indexOf(childNameToReplaceRoutesUnder) != -1) {
  //       // we found it. taking the route prefix
  //       let prefixRoute: string = currentRoutes[i].path;
  //       // first removing the module line
  //       currentRoutes.splice(i, 1);
  //       // now injecting the new routes
  //       // we need to add the prefix route first
  //       this.addPrefixToRoutes(routesToInject, prefixRoute);
  //       for (let route of routesToInject) {
  //         currentRoutes.push(route);
  //       }
  //       // since we found it we can break the injection
  //       return;
  //     }

  //     if (currentRoutes[i].children != null) {
  //       this.injectModuleRoutes(currentRoutes[i].children, routesToInject, childNameToReplaceRoutesUnder);
  //     }
  //   }
  // }

  // private addPrefixToRoutes(routes: Routes, prefix: string) {
  //   for (let i = 0; i < routes.length; i++) {
  //     routes[i].path = prefix + '/' + routes[i].path;
  //   }
  // }
}
