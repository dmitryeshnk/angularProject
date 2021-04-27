import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/models/user';
import { Role } from '@app/models/role';
import { UserService } from '@app/services/user.service';

import { EditComponent } from "./edit.component";

@Component({ templateUrl: 'admin.html' })
export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];

    isVisibleEdit: boolean = false;
    isVisibleAdd: boolean = false;

    editUser: User;

    @ViewChild(EditComponent, {static: false})
    private editComponent: EditComponent;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getUsers().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

    add() {
      this.isVisibleAdd = !this.isVisibleAdd;
      this.isVisibleEdit = false;
    }

    change(user: User) {
      if(user.roles.find(role => role.name == 'admin')) {
        user.roles.splice(user.roles.findIndex(role => role.name == 'admin'), 1);
      } else {
        user.roles.push(new Role(1, 'admin'));
      }
      this.userService.updateUser(user).subscribe();
    }

    delete(user: User) {
      this.users.splice(this.users.findIndex(item => item.id == user.id), 1);
      this.userService.deleteUser(user.id).subscribe();
    }

    edit(user: User) {
      this.editComponent.onLoad(user);
      this.isVisibleAdd = false;
      console.log(this.editUser?.id == user.id);

      if(this.editUser?.id == user.id && this.isVisibleEdit) {
        this.isVisibleEdit = false;
      } else {
        this.isVisibleEdit = true;
      }
      this.editUser = user;
    }

    onChanged() {
      setTimeout(() => {  this.userService.getUsers().subscribe((data) => this.users=data); }, 500);
    }
}
