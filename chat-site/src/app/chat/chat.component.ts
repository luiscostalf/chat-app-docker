import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { SocketService } from '../services/socket-io.service';
import { Socket } from 'socket.io-client';
import { ChatApiService } from '../services/api/chat-api.service';
import * as moment from 'moment';

export interface Message {
  sender: string;
  message: string;
  emotions?: {
    [key: string]: string
  };
  irony?: { [key: string]: string };
  sentiment?: { [key: string]: string };
  timestamp: string;
  emoji?: string;
  viewed: boolean;
  details?: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messageList', { static: false }) messageList?: ElementRef;
  newMessage: string = '';
  messages: Message[] = [];
  socket: Socket | undefined;
  detailsOpen: boolean = false;
  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === "Enter") {
      this.sendMessage();
    }
  }

  constructor(private socketService: SocketService, private apiService: ChatApiService) {
    // Fetch messages from the API on component initialization
    this.apiService.getAllMessages().subscribe(m => this.messages = m.map(message => {
      let keyToFind = Object.keys(<any>message.emotions)[0];
      if (keyToFind) {
        let emojiFromKey = (<any>Object.entries(this.emojiMap).find((key, value) => key[0] === keyToFind))[1];
        message.emoji = emojiFromKey ? emojiFromKey : '';
        message.viewed = true;
      }
      return message;
    }));
  }

  showBot: boolean = true;
  buttonText: string = 'Change to Bot';
  emojiMap = {
    "neutral": "😐",
    "approval": "👍",
    "annoyance": "😒",
    "realization": "😲",
    "admiration": "😍",
    "disapproval": "👎",
    "disappointment": "😞",
    "confusion": "😕",
    "anger": "😠",
    "excitement": "😃",
    "curiosity": "🤔",
    "disgust": "🤢",
    "joy": "😄",
    "sadness": "😢",
    "amusement": "😄",
    "optimism": "😊",
    "love": "❤️",
    "fear": "😨",
    "gratitude": "🙏",
    "caring": "🤗",
    "desire": "😏",
    "surprise": "😲",
    "embarrassment": "😳",
    "grief": "😭",
    "pride": "😌",
    "relief": "😌",
    "nervousness": "😰",
    "remorse": "😔"
  }
  ngOnInit(): void {

    this.socket = this.socketService.getSocket();
    this.socket.on('response', (message: Message) => {
      let messageIndex = this.messages.findIndex(m => m.message === message.message && m.timestamp === m.timestamp)
      let keyToFind = Object.keys(<any>message.emotions)[0]
      if (keyToFind) {
        let emojiFromKey = (<any>Object.entries(this.emojiMap).find((key, value) => key[0] === keyToFind))[1]
        message.emoji = emojiFromKey ? emojiFromKey : ''
        message.viewed = true
        this.messages[messageIndex] = message
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      let message = {
        visitorID: 'USE AS CHAT ROOM',
        message: this.newMessage,
        timestamp: moment().utc().format('YYYY-MM-DD HH:mm:ss.SSSSS'),
        sender: 'user',
        viewed: false
      };
      this.messages.push(message);
      this.scrollToBottom();
      this.socket?.emit(this.buttonText === 'Change to Bot' ? 'chat message': 'bot-message', message)
      this.newMessage = '';
    }

  }


  // Function to scroll to the bottom of the message list
  scrollToBottom() {
    if (this.messageList) {
      this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
    }
  }

  openMessageDetails(message: Message) {
    message.details = !message.details
    //this.detailsOpen = true;
  }

  ngOnDestroy(): void {
    // Clean up socket subscription on component destruction
    const socket = this.socketService.getSocket();
    socket.off('message');
  }

  toggleButtonText() {
    this.showBot = !this.showBot;
    if(this.buttonText === 'Change to Bot') {
      this.buttonText = 'Change to Sentiment'
      this.socket?.off('response')
      this.apiService.getAllBotMessages().subscribe(m => this.messages = m.map(message => {
        return message
      }))
      this.socket?.on('bot-message', (message: Message) => {
        this.messages.push(message)
      });
    } else {
      this.buttonText = 'Change to Bot'
      this.socket?.off('bot message')
      this.apiService.getAllMessages().subscribe(m => this.messages = m.map(message => {
        let keyToFind = Object.keys(<any>message.emotions)[0]
        if (keyToFind) {
          let emojiFromKey = (<any>Object.entries(this.emojiMap).find((key, value) => key[0] === keyToFind))[1]
          message.emoji = emojiFromKey ? emojiFromKey : ''
          message.viewed = true
        }
        return message
      }))
      this.socket?.on('response', (message: Message) => {
        let messageIndex = this.messages.findIndex(m => m.message === message.message && m.timestamp === m.timestamp)
        let keyToFind = Object.keys(<any>message.emotions)[0]
        if (keyToFind) {
          let emojiFromKey = (<any>Object.entries(this.emojiMap).find((key, value) => key[0] === keyToFind))[1]
          message.emoji = emojiFromKey ? emojiFromKey : ''
          message.viewed = true
          this.messages[messageIndex] = message
        }
      });
    }

  }
}
