'use strict';

import io from 'socket.io-client';

export class Chat {

  constructor (url, params) {
    this.messages = [];
    this.socket = io.connect(url, params);
    this.socket.on('chat.receive_message', message => this.receiveMessage(message));
    this.socket.on('chat.connected', messages => this.receiveMessages(messages));
  }

  sendMessage (message) {
    this.socket.emit('chat.send_message', message);
  }

  receiveMessage (message) {
    this.messages.push(message);
  }

  receiveMessages (messages) {
    messages.forEach(message => this.messages.push(message));
  }
}
