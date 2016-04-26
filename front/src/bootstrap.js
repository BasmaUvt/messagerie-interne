'use strict';

import {bootstrap} from 'angular2/platform/browser';
import {Authentication} from './services/auth';
import {AppComponent} from './components/app';

bootstrap(AppComponent, [Authentication]).catch(err => console.error);
