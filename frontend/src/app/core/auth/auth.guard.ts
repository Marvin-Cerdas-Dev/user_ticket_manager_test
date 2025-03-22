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

    /**
     * Determines if a route can be activated based on the user's authentication status.
     * @param route The activated route snapshot.
     * @param state The router state snapshot.
     * @returns A boolean or UrlTree indicating whether the route can be activated.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // Check if the user is logged in
        if (this.authService.isLoggedIn()) {
            return true;
        }

        // Redirect to the login page if the user is not logged in
        return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
}