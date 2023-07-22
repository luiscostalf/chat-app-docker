import { Component, Input } from '@angular/core';
import { Message } from '../chat/chat.component';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
})
export class MessageDetailsComponent {
  @Input() message: Message;
}
