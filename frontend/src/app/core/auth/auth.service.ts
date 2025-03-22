import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { User, LoginResponse, LoginRequest } from '../shared/models/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUri = 'http://localhost:3000/api/auth';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();
    private tokenKey = 'auth_token';
    private userKey = 'current_user';

    constructor(private http: HttpClient, private router: Router) {
        this.loadUserFromStorage();
    }

    /**
     * Logs in the user with the provided credentials.
     * @param credentials The login credentials.
     * @returns An observable of the login response.
     */
    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUri}/login`, credentials)
            .pipe(
                tap(response => {
                    this.setAuthData(response);
                })
            );
    }

    /**
     * Logs out the current user.
     */
    logout(): void {
        const token = this.getToken();
        if (!token) {
            this.clearSession();
            return;
        }
        this.http.post(`${this.apiUri}/logout`, { token }).subscribe({
            next: () => {
                this.clearSession();
            },
            error: () => {
                this.clearSession();
            }
        });
    }

    /**
     * Registers a new user.
     * @param user The user details.
     * @returns An observable of the registration response.
     */
    register(user: { fullName: string; email: string; password: string, role: string }): Observable<any> {
        return this.http.post(`${this.apiUri}/register`, user);
    }

    /**
     * Checks if the user is logged in.
     * @returns A boolean indicating if the user is logged in.
     */
    isLoggedIn(): boolean {
        const token = this.getToken();
        const user = this.getCurrentUserFromStorage();
        if (!token || !user) {
            return false;
        }
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const isExpired = payload.exp * 1000 < Date.now();
            return !isExpired;
        } catch (error) {
            return false;
        }
    }

    /**
     * Gets the JWT token from local storage.
     * @returns The JWT token or null if not found.
     */
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Checks if the current user is an admin.
     * @returns An observable of a boolean indicating if the user is an admin.
     */
    isAdmin$(): Observable<boolean> {
        return this.currentUser$.pipe(
            map(user => !!user && user.role === 'admin')
        );
    }

    /**
     * Checks if the current user is an admin.
     * @returns A boolean indicating if the user is an admin.
     */
    isAdmin(): boolean {
        const user = this.currentUserSubject.value || this.getCurrentUserFromStorage();
        return !!user && user.role === 'admin';
    }

    /**
     * Clears the current session.
     */
    private clearSession(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    /**
     * Sets the authentication data in local storage and updates the current user subject.
     * @param response The login response containing the token and user information.
     */
    private setAuthData(response: LoginResponse): void {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
    }

    /**
     * Gets the current user from local storage.
     * @returns The current user or null if not found.
     */
    private getCurrentUserFromStorage(): User | null {
        const userJson = localStorage.getItem(this.userKey);
        if (userJson) {
            try {
                return JSON.parse(userJson) as User;
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    /**
     * Loads the user from local storage or fetches it from the server if not found.
     */
    private loadUserFromStorage(): void {
        // First, try to load the user from local storage
        const user = this.getCurrentUserFromStorage();
        if (user) {
            this.currentUserSubject.next(user);
            return;
        }

        // If no user in local storage, try to get it from the token
        const token = this.getToken();
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                // Check if we can get the user from the payload
                if (payload.user) {
                    const user = payload.user;
                    // Save the user in local storage for future loads
                    localStorage.setItem(this.userKey, JSON.stringify(user));
                    this.currentUserSubject.next(user);
                } else {
                    // If no user info in the token, make a request
                    this.fetchCurrentUser();
                }
            } catch (error) {
                this.logout();
            }
        }
    }

    /**
     * Fetches the current user from the server.
     */
    private fetchCurrentUser(): void {
        const token = this.getToken();
        if (!token) {
            return;
        }

        this.http.get<User>(`${this.apiUri}/me`).subscribe({
            next: (user) => {
                localStorage.setItem(this.userKey, JSON.stringify(user));
                this.currentUserSubject.next(user);
            },
            error: () => {
                this.logout();
            }
        });
    }
}