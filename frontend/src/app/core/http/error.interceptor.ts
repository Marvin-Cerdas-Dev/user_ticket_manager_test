import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    /**
     * Intercepts HTTP requests to handle errors.
     * If a 401 Unauthorized error is encountered, logs out the user.
     * @param request The outgoing HTTP request.
     * @param next The next interceptor in the chain.
     * @returns An observable of the HTTP event.
     */
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authService.logout();
                }

                const errorMsg = error.error?.message || 'An error has happened';
                return throwError(() => new Error(errorMsg));
            })
        );
    }
}