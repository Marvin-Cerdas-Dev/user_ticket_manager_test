import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * Intercepts HTTP requests to add an Authorization header with the JWT token if available.
 * @param req The outgoing HTTP request.
 * @param next The next interceptor in the chain.
 * @returns The handled request with the Authorization header if the token is available.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    if (token) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(authReq);
    }

    return next(req);
};