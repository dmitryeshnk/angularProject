import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import {User} from '@app/models/user';
import { AuthenticationService } from '@app/services/auth.service';
import { UserService } from '@app/services/user.service';

@Component({ templateUrl: 'home.html' })
export class HomeComponent {


    constructor(private auth: AuthenticationService) {

    }

    authenticated() { return this.auth.authenticated; }

}
