import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: io.Socket;

  constructor() {
    this.socket = io.connect('http://127.0.0.1:8089',{transports: ['websocket']});
    this.socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  getSocket(): io.Socket {
    return this.socket;
  }

  emit(message:any) {
    this.socket.emit('chat message',message)
  }
}
