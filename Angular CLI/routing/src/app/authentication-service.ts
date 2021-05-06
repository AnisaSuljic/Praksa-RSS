import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './models/user.model'
import { MyConfig } from './my-config';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    public currentUser: User;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.userSubject = new BehaviorSubject<User>(this.currentUser);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    } 

    login():Observable<User[]> {
        return this.http.get<User[]>(`${MyConfig.adresaServera}/korisnik/`);
    }
    //login(username: string | undefined, password: string | undefined) :Observable<any> {
        //return this.http.post<any>(`${MyConfig.adresaServera}/korisnik/login`, { username, password });
            // .pipe(map(user => {
            //     // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            //     user.authdata = window.btoa(username + ':' + password);
            //     localStorage.setItem('user', JSON.stringify(user));
            //     this.userSubject.next(user);
            //     return user;
            // }));
    //}

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.currentUser = new User();
        this.userSubject.next(this.currentUser);
        //this.router.navigate(['/login']);
    }
}