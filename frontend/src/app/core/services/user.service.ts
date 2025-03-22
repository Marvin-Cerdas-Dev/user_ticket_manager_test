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

    /**
     * Fetches all users from the server.
     * @returns An observable of an array of users.
     */
    getUsers(): Observable<UserManage[]> {
        return this.http.get<UserManage[]>(this.apiUrl);
    }

    /**
     * Fetches a user by their ID from the server.
     * @param id The ID of the user to fetch.
     * @returns An observable of the user.
     */
    getUserById(id: string): Observable<UserManage> {
        return this.http.get<UserManage>(`${this.apiUrl}/${id}`);
    }

    /**
     * Creates a new user on the server.
     * @param user The user creation request object.
     * @returns An observable of the created user.
     */
    createUser(user: UserManage): Observable<UserManage> {
        return this.http.post<UserManage>(this.apiUrl, user);
    }

    /**
     * Updates an existing user on the server.
     * If the password is empty, it is not included in the update request.
     * @param id The ID of the user to update.
     * @param user The user update request object.
     * @returns An observable of the updated user.
     */
    updateUser(id: string, user: UserManage): Observable<UserManage> {
        if (user.password === '') {
            const { password, ...userWithoutPassword } = user;
            return this.http.put<UserManage>(`${this.apiUrl}/${id}`, userWithoutPassword);
        }
        return this.http.put<UserManage>(`${this.apiUrl}/${id}`, user);
    }

    /**
     * Deletes a user by their ID from the server.
     * @param id The ID of the user to delete.
     * @returns An observable of any response.
     */
    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}