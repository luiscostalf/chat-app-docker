import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketService } from './services/socket-io.service';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { ChatApiService } from './services/api/chat-api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpProxy } from './services/api/http-proxy.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MessageDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [HttpProxy,SocketService,ChatApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
