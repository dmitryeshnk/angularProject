import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/services/auth.service';
import { User } from '@app/models/user';
import { Role } from '@app/models/role';
import { HttpClient } from '@angular/common/http';
import { finalize } from "rxjs/operators";


@Component({ selector: 'app', templateUrl: 'app.html' })
export class AppComponent {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private http: HttpClient
    ) {
    }

    authenticated() { return this.authenticationService.authenticated; }

    isAdmin() {
      return this.authenticationService.isAdmin;
    }

    logout() {
      this.http.post('http://localhost:8080/logout', {}).pipe(finalize(() => {
        this.authenticationService.authenticated = false;
        this.router.navigateByUrl('/login');
    })).subscribe();
    }
}
