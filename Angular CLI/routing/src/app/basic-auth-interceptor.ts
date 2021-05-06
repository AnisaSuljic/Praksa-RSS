import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication-service';
import { MyConfig } from './my-config';
import { Router } from '@angular/router';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header with basic auth credentials if user is logged in and request is to the api url
        // const user = this.authenticationService.userValue;
        // const isLoggedIn = user && user.authdata;
        // const isApiUrl = request.url.startsWith(MyConfig.adresaServera);
        // if (isLoggedIn && isApiUrl) {
        //     request = request.clone({
        //         setHeaders: { 
        //             Authorization: `Basic ${user.authdata}`
        //         }
        //     });
        // }
        var token = localStorage.getItem('token');
        if(token!=null){
            const cloneReq = request.clone({headers: request.headers.set('Authorization', 'Basic ' + token)});
            return next.handle(cloneReq)
            // .pipe(tap ( succ=>{
            //     }, error => {
            //         if(error.status==401){
            //             localStorage.removeItem('token');
            //             this.router.navigate(['adminpanel']);
            //         }
            //     }
            //     ));
        }
        else{
            return next.handle(request.clone());
        }
    }
}