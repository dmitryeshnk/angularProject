import { Input, Component, EventEmitter, Output } from '@angular/core';
import { UserService} from '@app/services/user.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {User} from '@app/models/user';
import {Gender} from '@app/models/gender';

import * as moment from 'moment';

@Component({
    selector: 'edit-comp',
    templateUrl: 'edit.html',
    styles: [`
          .invisible{
            display:none;
          }
    `]
})
export class EditComponent {
    @Input()isVisible: boolean;

    @Output() onChanged = new EventEmitter();

    max: string = moment().format("YYYY-MM-DD");

    id: number;

    myForm : FormGroup;

    constructor(private userService: UserService,
                private formBuilder: FormBuilder){
      this.onLoad(null);
    }

    onLoad(user: User) {
      this.id = user?.id;
      this.myForm = this.formBuilder.group({
        id: [user?.id],
        username: [user?.username, Validators.required],
        email: [user?.email, [
                            Validators.required,
                            Validators.email
                        ]],
        password: [user?.password, Validators.required],
        birthday: [moment(new Date(user?.birthday)).format('YYYY-MM-DD'), Validators.required],
        gender: [user?.gender.id, Validators.required]
      });
    }

    get f() { return this.myForm.controls; }

    submit(){
      let user = new User(
        this.f.username.value,
        this.f.email.value,
        this.f.password.value,
        new Gender(this.f.gender.value),
        this.id
      );
      user.birthday = this.f.birthday.value;

      this.userService.updateUser(user).subscribe();

      this.isVisible = false;
      this.onChanged.emit();
    }
}
