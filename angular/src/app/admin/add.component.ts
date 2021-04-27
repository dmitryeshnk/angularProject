import { Input, Component, EventEmitter, Output } from '@angular/core';
import { UserService} from '@app/services/user.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Gender} from '@app/models/gender';
import {User} from '@app/models/user';

import * as moment from 'moment';

@Component({
    selector: 'add-comp',
    templateUrl: 'add.html',
    styles: [`
          .invisible{
            display:none;
          }
    `]
})
export class AddComponent {
    @Input()isVisible: boolean;

    @Output() onChanged = new EventEmitter();

    addForm : FormGroup;

    max: string = moment().format("YYYY-MM-DD");

    constructor(private userService: UserService,
                private formBuilder : FormBuilder){
      this.onLoad();
    }

    onLoad() {
      this.addForm = this.formBuilder.group({
        username: ["", Validators.required],
        email: ["", [
                            Validators.required,
                            Validators.email
                        ]],
        password: ["", Validators.required],
        birthday: [moment(new Date()).format('YYYY-MM-DD'), Validators.required],
        gender: [1, Validators.required]
      });
    }

    submit(){
      let user = new User(
        this.addForm.controls['username'].value,
        this.addForm.controls['email'].value,
        this.addForm.controls['password'].value,
        new Gender(this.addForm.controls['gender'].value)
      );
      user.birthday = this.addForm.controls['birthday'].value;
      console.log(user);

      this.userService.createUser(user).subscribe();

      this.isVisible = false;
      this.onChanged.emit();
    }
}
