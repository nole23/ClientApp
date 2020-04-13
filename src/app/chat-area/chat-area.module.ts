import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ChatAreaRoutingModule } from './chat-area-routing.module';

import { ChatComponent } from '../components/chats/chat/chat.component';
import { ListUsersChatComponent } from '../components/plagin/list-users-chat/list-users-chat.component';
import { ChatAreaComponent } from '../components/plagin/chat-area/chat-area.component';

@NgModule({
  declarations: [
    ChatComponent,
    ListUsersChatComponent,
    ChatAreaComponent
  ],
  imports: [
    CommonModule,
    ChatAreaRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [ChatComponent]
})
export class ChatAreaModule { }
