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
        // Check if the user is an admin
        this.isAdmin = this.authService.isAdmin();

        // Subscribe to changes in the admin status
        this.subscription.add(
            this.authService.isAdmin$().subscribe(isAdmin => {
                this.isAdmin = isAdmin;
                // If the user is not an admin, redirect
                if (!isAdmin) {
                    // You could redirect to another page here
                }
            })
        );

        // Load the list of users
        this.loadUsers();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions to prevent memory leaks
        this.subscription.unsubscribe();
    }

    /**
     * Loads the list of users from the server.
     */
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
                }
            })
        );
    }

    /**
     * Deletes a user by their ID.
     * @param id The ID of the user to delete.
     */
    deleteUser(id: string): void {
        if (confirm('Are you sure you want to delete this user?')) {
            this.subscription.add(
                this.userService.deleteUser(id).subscribe({
                    next: () => {
                        this.users = this.users.filter(user => user._id !== id);
                    },
                    error: (err) => {
                        this.error = 'Error deleting user. Please try again.';
                    }
                })
            );
        }
    }
}