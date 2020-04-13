import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';

import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { SettingsProfileComponent } from './components/plagin/settings-profile/settings-profile.component';
import { NotificationComponent } from './components/plagin/notification/notification.component';
import { ProfilFriendsComponent } from './components/profil-friends/profil-friends.component';
import { ChatAreaModule } from './chat-area/chat-area.module';

const routes: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'chat',
    loadChildren: () => ChatAreaModule
  },
  { path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsProfileComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'friends/:id', component: ProfilFriendsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
