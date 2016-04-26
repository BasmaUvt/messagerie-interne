'use strict';

import {Component, ElementRef} from 'angular2/core';
import {Authentication} from './../services/auth';
import {Chat} from './../services/chat';

@Component({
  selector: 'chat-component',
  template: `
  <ul>
    <li *ngFor="#message of messages" [ngClass]="{ active: isActive(message) }">
        <article>
            {{ message.username }}
            <hr/>
            {{ message.content }}
        </article>
    </li>
  </ul>
  <form (submit)="sendMessage()">
    <input type="text" [(ngModel)]="message" placeholder="Votre message"/>
    <button type="submit">Envoyer</button>
  </form>
  `
})
export class ChatComponent {
  constructor (element: ElementRef, auth: Authentication) {
    this.element = element.nativeElement;
    this.auth = auth;
    this.chat = new Chat('http://url-server', { query: `username=${this.auth.user.username}`});
    this.messages = this.chat.messages;
  }

  sendMessage () {
    if (!!this.message) {
        this.chat.sendMessage(this.message);
        this.message = null;
    }
  }

  isActive (message) {
    return message.username == this.auth.user.username;
  }

  ngAfterViewChecked () {
    let chatElement = this.element.querySelector('ul');
    chatElement.scrollTo(0, chatElement.scrollHeight);
  }
}
