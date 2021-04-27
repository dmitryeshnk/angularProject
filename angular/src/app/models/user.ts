import {Gender} from './gender';
import {Role} from './role';

export class User{
    id: number;
    username: string;
    password: string;
    email: string;
    birthday: Date;
    gender: Gender;
    roles: Role[];
    token?: string;

    constructor(
                username: string,
                email: string,
                password: string,
                gender: Gender,
                id?: number,
                birthday?: string,
                roles?: Role[]
              ) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.birthday = new Date(birthday);
      this.gender = gender;
      this.roles = roles;
    }
}
