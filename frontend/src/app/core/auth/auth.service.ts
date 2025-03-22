import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, of } from 'rxjs';
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
    private userKey = 'current_user'; // Nueva clave para almacenar el usuario

    constructor(private http: HttpClient, private router: Router) {
        this.loadUserFromStorage();
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUri}/login`, credentials)
            .pipe(
                tap(response => {
                    this.setAuthData(response);
                })
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

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    // Método para obtener el estado de administrador como Observable
    isAdmin$(): Observable<boolean> {
        return this.currentUser$.pipe(
            map(user => !!user && user.role === 'admin')
        );
    }

    // Método sincrónico para verificar si es administrador
    isAdmin(): boolean {
        const user = this.currentUserSubject.value || this.getCurrentUserFromStorage();
        return !!user && user.role === 'admin';
    }

    private clearSession(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    private setAuthData(response: LoginResponse): void {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
    }

    // Obtener usuario directamente del localStorage
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

    private loadUserFromStorage(): void {
        // Primero intentamos cargar el usuario desde localStorage
        const user = this.getCurrentUserFromStorage();
        if (user) {
            this.currentUserSubject.next(user);
            return;
        }

        // Si no hay usuario en localStorage, intentamos obtenerlo del token
        const token = this.getToken();
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                // Verificar si podemos obtener el usuario del payload
                if (payload.user) {
                    const user = payload.user;
                    // Guardar el usuario en localStorage para futuras cargas
                    localStorage.setItem(this.userKey, JSON.stringify(user));
                    this.currentUserSubject.next(user);
                } else {
                    // Si no hay información de usuario en el token, hacemos una petición
                    this.fetchCurrentUser();
                }
            } catch (error) {
                console.error('Error decoding token', error);
                this.logout();
            }
        }
    }

    // Método para obtener el usuario actual desde el servidor
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