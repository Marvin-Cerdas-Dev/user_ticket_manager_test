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

    fetchUserDetails(userId: string): void {
        this.userService.getUserById(userId).subscribe({
            next: (user) => {
                this.user = user;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching user details:', err);
                this.error = true;
                this.loading = false;
            }
        });
    }

    navigateToEdit(): void {
        if (this.user?._id) {
            this.router.navigate(['/users', this.user._id, 'edit']);
        }
    }

    deleteUser(): void {
        if (!this.user?._id) return;

        if (confirm('¿Estás seguro que deseas eliminar este usuario?')) {
            this.userService.deleteUser(this.user._id).subscribe({
                next: () => {
                    this.router.navigate(['/users']);
                },
                error: (err) => {
                    console.error('Error deleting user:', err);
                }
            });
        }
    }

    goBack(): void {
        this.router.navigate(['/users']);
    }
}