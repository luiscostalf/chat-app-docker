import { Injectable } from '@angular/core';
import { HttpProxy } from './http-proxy.service';
import { Observable } from 'rxjs';
import { Message } from 'src/app/chat/chat.component';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ChatApiService {
    rootURL = 'http://127.0.0.1:8089'
    constructor(
        private httpProxy: HttpProxy
    ) { }
    
    getAllMessages(): Observable<Message[]> {
        return this.httpProxy.post(
            `${this.rootURL}/mongo/all-messages`,
            {visitorID: 'USE AS CHAT ROOM'}
        );
    }
    getAllBotMessages(): Observable<Message[]> {
        return this.httpProxy.post(
            `${this.rootURL}/mongo/all-bot-messages`,
            {visitorID: 'USE AS CHAT ROOM'}
        );
    }
    


}