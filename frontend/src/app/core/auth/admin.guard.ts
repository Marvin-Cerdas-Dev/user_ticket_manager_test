import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {

    constructor(private authService: AuthService, private router: Router) { }

    /**
     * Determines if a route can be activated based on the user's authentication and authorization status.
     * @param route The activated route snapshot.
     * @param state The router state snapshot.
     * @returns A boolean or UrlTree indicating whether the route can be activated.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // Check if the user is logged in and is an admin
        if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
            return true;
        }

        // Redirect to the dashboard if the user is not an admin
        return this.router.createUrlTree(['/dashboard']);
    }
}