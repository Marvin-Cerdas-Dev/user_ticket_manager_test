import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

    constructor(private http: HttpClient, private router: Router) {
        this.loadUserFromStorage();
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUri}/login`, credentials)
            .pipe(
                tap(response => { this.setAuthData(response); })
            );
    }

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

    register(user: { fullName: string; email: string; password: string, role: string }): Observable<any> {
        return this.http.post(`${this.apiUri}/register`, user);
    }

    isLoggedIn(): boolean {
        console.log('AuthService: isLoggedIn called');
        const token = this.getToken();
        if (!token) {
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

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isAdmin(): boolean {
        const user = this.currentUserSubject.value;
        return user !== null && user.role === 'admin';
    }

    private clearSession(): void {
        localStorage.removeItem(this.tokenKey);
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    private setAuthData(response: LoginResponse): void {
        localStorage.setItem(this.tokenKey, response.token);
        this.currentUserSubject.next(response.user);
    }

    private loadUserFromStorage(): void {
        const token = this.getToken();
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.user) {
                    this.currentUserSubject.next(payload.user);
                }
            } catch (error) {
                console.error('Error decoding token', error);
                this.logout();
            }
        }
    }
}