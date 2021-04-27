import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '@app/models/user';
import {Role} from '@app/models/role';
import { AuthenticationService } from "@app/services/auth.service";

@Injectable()
export class UserService{

    constructor(private http: HttpClient,
                private authenticationService: AuthenticationService ){ }

    getById(id:number) : Observable<User>{
        return this.http.get<User>('http://localhost:8080/users/' + id,
            {headers: this.authenticationService.headers});
    }

    getUsers() : Observable<User[]>{
        return this.http.get<User[]>('http://localhost:8080/users',
            {headers: this.authenticationService.headers});
    }

    updateUser(user: User) : Observable<{}> {
      return this.http.put('http://localhost:8080/users/' + user.id, user,
            {headers: this.authenticationService.headers});
    }

    deleteUser(id: number) : Observable<{}> {
      return this.http.delete('http://localhost:8080/users/' + id,
            {headers: this.authenticationService.headers});
    }

    createUser(user: User) : Observable<{}> {
      return this.http.post('http://localhost:8080/users', user,
            {headers: this.authenticationService.headers});
    }

    registerUser(user: User) : Observable<{}> {
      return this.http.post('http://localhost:8080/register', user);
    }
}
