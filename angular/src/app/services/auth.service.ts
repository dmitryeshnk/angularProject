import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@app/models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  authenticated = false;

  isAdmin = false;

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {

        this.headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});

        this.http.get('http://localhost:8080/user', {headers: this.headers}).subscribe(response => {
            if (response['name']) {
                this.isAdmin = response['authorities'].find(role => role.name == 'admin');
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });

    }
    // private currentUserSubject: BehaviorSubject<User>;
    // public currentUser: Observable<User>;
    //
    // constructor(private http: HttpClient) {
    //     this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    //     this.currentUser = this.currentUserSubject.asObservable();
    // }
    //
    // public get currentUserValue(): User {
    //     return this.currentUserSubject.value;
    // }
    //
    // login(username: string, password: string) {
    //
    //     return this.http.post("http://localhost:8080/login", {
    //       userName: username,
    //       password: password
    //     }).pipe(map(res => console.log(res)));



        // return this.http.post<any>('http://localhost:8080/login', { username, password })
        //     .pipe(map(user => {
        //
        //
        //         if (user && user.token) {
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //             console.log(JSON.parse(localStorage.getItem('currentUser')));
        //
        //             // this.currentUserSubject.next(user);
        //             return user;
        //         }
        //
        //
        //     }));
}
