import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication-service';
import { MyConfig } from '../my-config';
import { Router } from '@angular/router';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = localStorage.getItem('token');
        if(token!=null){
            const cloneReq = request.clone({headers: request.headers.set('Authorization', 'Basic ' + token)});
            return next.handle(cloneReq)
        }
        else{
            return next.handle(request.clone());
        }
    }
}