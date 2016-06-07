'use strict';

import {Injectable} from '@angular/core';

@Injectable()
export class Authentication {

  constructor () {
    this.user = JSON.parse(localStorage.getItem('chat-auth'));
  }

  isAuthenticated () {
    return !!this.user;
  }

  login (username) {
    this.user = { username }; //ES6
    localStorage.setItem('chat-auth',  JSON.stringify(this.user));
  }

  logout () {
    this.user = null;
    localStorage.removeItem('chat-auth');
  }
}
