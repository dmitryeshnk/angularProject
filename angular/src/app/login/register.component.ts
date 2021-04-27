import { Input, Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { UserService} from '@app/services/user.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Gender} from '@app/models/gender';
import {User} from '@app/models/user';

import { formatDate } from '@angular/common';
import * as moment from 'moment';


@Component({
    selector: 'register-comp',
    templateUrl: 'register.html',
    styles: [`
          .invisible{
            display:none;
          }
    `]
})
export class RegisterComponent {
    @Input()isVisible: boolean;

    @Output() onChanged = new EventEmitter();

    max: string = moment().format("YYYY-MM-DD");

    registerForm : FormGroup;

    constructor(private userService: UserService,
                private formBuilder : FormBuilder){
      this.onLoad();
    }

    onLoad() {
      this.registerForm = this.formBuilder.group({
        username: ["", Validators.required],
        email: ["", [
                            Validators.required,
                            Validators.email
                        ]],
        password: ["", Validators.required],
        birthday: [moment(new Date()).format('YYYY-MM-DD'), Validators.required],
        gender: [1, Validators.required],
        recaptcha: ["", Validators.required]
      });
    }

    get f() { return this.registerForm.controls; }

    submit(){
      let user = new User(
        this.registerForm.controls['username'].value,
        this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value,
        new Gender(this.registerForm.controls['gender'].value)
      );
      user.birthday = this.registerForm.controls['birthday'].value;
      console.log(user);

      this.userService.registerUser(user).subscribe();

      this.isVisible = false;
      this.onChanged.emit();
    }

    login(){
      this.isVisible = false;
      this.onChanged.emit();
    }
}
