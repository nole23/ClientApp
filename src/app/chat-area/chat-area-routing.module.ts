import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../guard/auth.guard';

import { ChatComponent } from '../components/chats/chat/chat.component';

const routes: Routes = [
  { path: ':id', component: ChatComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatAreaRoutingModule { }
