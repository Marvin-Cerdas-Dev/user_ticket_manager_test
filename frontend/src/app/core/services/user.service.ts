
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserManage } from '../shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/api/user';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<UserManage[]> {
        return this.http.get<UserManage[]>(this.apiUrl);
    }

    getUserById(id: string): Observable<UserManage> {
        return this.http.get<UserManage>(`${this.apiUrl}/${id}`);
    }

    createUser(user: UserManage): Observable<UserManage> {
        return this.http.post<UserManage>(this.apiUrl, user);
    }

    updateUser(id: string, user: UserManage): Observable<UserManage> {
        if (user.password === '') {
            const { password, ...userWithoutPassword } = user;
            return this.http.put<UserManage>(`${this.apiUrl}/${id}`, userWithoutPassword);
        }
        return this.http.put<UserManage>(`${this.apiUrl}/${id}`, user);
    }

    // Eliminar un usuario
    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}