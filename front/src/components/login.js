'use strict';

import {Component, Input} from '@angular/core';
import {Authentication} from './../services/auth';

@Component({
  selector: 'login-component',
  template: `
  <form (ngSubmit)="login()">
    <label for="username">Pseudo</label>
    <input id="username" type="text" [(ngModel)]="username" required="required" />
    <button type="submit">Connexion</button>
  </form>
  `
})
export class LoginComponent {
  constructor (auth: Authentication) {
    this.auth = auth;
    this.username = null;
  }

  login () {
    this.auth.login(this.username);
  }
}
