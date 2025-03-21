import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const tokenKey = 'auth_token';
        const token = localStorage.getItem(tokenKey);

        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const isExpired = payload.exp * 1000 < Date.now();
                if (!isExpired) {
                    return true;
                }
            } catch (error) {
                console.error('Error validando token', error);
            }
        }

        return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
}