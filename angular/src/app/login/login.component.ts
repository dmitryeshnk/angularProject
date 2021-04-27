import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/services/auth.service';
import { UserService } from '@app/services/user.service';

@Component({
    templateUrl: 'login.html'
})
export class LoginComponent {

  credentials = {username: '', password: ''};
  error: boolean = false;

  isVisibleRegister:boolean = false;

  isVisible:boolean = true;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    showRegister() {
      this.error = false;
      this.isVisibleRegister = true;
      this.isVisible = false;
    }

    login(){
      this.error = false;
      this.authenticationService.authenticate(this.credentials, () => {
          this.router.navigateByUrl('/');
      });
      this.error = true;
    }

    onChanged() {
      this.isVisible = true;
      this.error = false;
    }
}
