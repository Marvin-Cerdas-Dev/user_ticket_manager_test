import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { UserManage } from '../../../shared/models/user.model';

@Component({
    selector: 'app-user-detail',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
    user: UserManage | null = null;
    loading = true;
    error = false;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const userId = this.route.snapshot.paramMap.get('id');
        if (userId) {
            this.fetchUserDetails(userId);
        } else {
            this.error = true;
            this.loading = false;
        }
    }

    /**
     * Fetches the user details by ID.
     * @param userId The ID of the user to fetch.
     */
    fetchUserDetails(userId: string): void {
        this.userService.getUserById(userId).subscribe({
            next: (user) => {
                this.user = user;
                this.loading = false;
            },
            error: () => {
                this.error = true;
                this.loading = false;
            }
        });
    }

    /**
     * Navigates to the edit user page.
     */
    navigateToEdit(): void {
        if (this.user?._id) {
            this.router.navigate(['/users', this.user._id, 'edit']);
        }
    }

    /**
     * Deletes the current user.
     */
    deleteUser(): void {
        if (!this.user?._id) return;

        if (confirm('Are you sure you want to delete this user?')) {
            this.userService.deleteUser(this.user._id).subscribe({
                next: () => {
                    this.router.navigate(['/users']);
                },
                error: () => {
                    this.error = true;
                }
            });
        }
    }

    /**
     * Navigates back to the user list.
     */
    goBack(): void {
        this.router.navigate(['/users']);
    }
}