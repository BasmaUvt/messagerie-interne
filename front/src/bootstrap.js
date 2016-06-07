'use strict';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {Authentication} from './services/auth';
import {AppComponent} from './components/app';

bootstrap(AppComponent, [Authentication]).catch(err => console.error);
