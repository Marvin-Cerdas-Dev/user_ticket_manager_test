import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../auth/auth.service';
import { UserManage } from '../../../shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit, OnDestroy {
    users: UserManage[] = [];
    isAdmin = false;
    isLoading = true;
    error: string | null = null;
    private subscription = new Subscription();

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        // Verificar si el usuario es administrador
        this.isAdmin = this.authService.isAdmin();

        // Suscribirse a cambios en el estado de administrador
        this.subscription.add(
            this.authService.isAdmin$().subscribe(isAdmin => {
                this.isAdmin = isAdmin;
                // Si el usuario no es administrador, redirigir
                if (!isAdmin) {
                    // Podrías redirigir a otra página aquí
                    console.error('Acceso no autorizado. Se requiere rol de administrador.');
                }
            })
        );

        // Cargar la lista de usuarios
        this.loadUsers();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadUsers(): void {
        this.isLoading = true;
        this.subscription.add(
            this.userService.getUsers().subscribe({
                next: (data) => {
                    this.users = data;
                    this.isLoading = false;
                },
                error: (err) => {
                    this.error = 'Error loading users. Please try again.';
                    this.isLoading = false;
                    console.error('Error loading users', err);
                }
            })
        );
    }

    deleteUser(id: string): void {
        if (confirm('Are you sure you want to delete this user?')) {
            this.subscription.add(
                this.userService.deleteUser(id).subscribe({
                    next: () => {
                        this.users = this.users.filter(user => user._id !== id);
                    },
                    error: (err) => {
                        this.error = 'Error deleting user. Please try again.';
                        console.error('Error deleting user', err);
                    }
                })
            );
        }
    }
}