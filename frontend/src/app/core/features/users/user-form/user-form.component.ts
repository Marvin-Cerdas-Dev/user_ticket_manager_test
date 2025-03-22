import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../auth/auth.service';
import { UserManage } from '../../../shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit, OnDestroy {
    userForm!: FormGroup;
    userId: string | null = null;
    isEditing = false;
    isLoading = false;
    error: string | null = null;
    isAdmin = false;
    private subscription = new Subscription();

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        // Check if the user is an admin
        this.isAdmin = this.authService.isAdmin();

        this.subscription.add(
            this.authService.isAdmin$().subscribe(isAdmin => {
                this.isAdmin = isAdmin;
                if (!isAdmin) {
                    this.router.navigate(['/dashboard']);
                }
            })
        );

        // Initialize the form
        this.initForm();

        // Get the user ID from the URL if it exists
        this.subscription.add(
            this.route.paramMap.subscribe(params => {
                this.userId = params.get('id');
                this.isEditing = !!this.userId;

                if (this.isEditing && this.userId) {
                    this.loadUserData(this.userId);
                }
            })
        );
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions to prevent memory leaks
        this.subscription.unsubscribe();
    }

    /**
     * Initializes the user form with validation rules.
     */
    initForm(): void {
        this.userForm = this.fb.group({
            fullName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', this.isEditing ? [] : [Validators.required, Validators.minLength(6)]],
            role: ['user', [Validators.required]]
        });
    }

    /**
     * Loads the user data by ID and populates the form.
     * @param id The ID of the user to load.
     */
    loadUserData(id: string): void {
        this.isLoading = true;
        this.subscription.add(
            this.userService.getUserById(id).subscribe({
                next: (user) => {
                    this.userForm.patchValue({
                        fullName: user.fullName,
                        email: user.email,
                        // Do not set the password as it is a sensitive field
                        role: user.role
                    });
                    this.isLoading = false;
                },
                error: (err) => {
                    this.error = 'Error loading user data. Please try again.';
                    this.isLoading = false;
                }
            })
        );
    }

    /**
     * Handles the form submission for creating or updating a user.
     */
    onSubmit(): void {
        if (this.userForm.invalid) {
            return;
        }

        const userData: UserManage = this.userForm.value;
        this.isLoading = true;

        if (this.isEditing && this.userId) {
            this.subscription.add(
                this.userService.updateUser(this.userId, userData).subscribe({
                    next: () => {
                        this.router.navigate(['/users']);
                    },
                    error: (err) => {
                        this.error = 'Error updating user. Please try again.';
                        this.isLoading = false;
                    }
                })
            );
        } else {
            this.subscription.add(
                this.userService.createUser(userData).subscribe({
                    next: () => {
                        this.router.navigate(['/users']);
                    },
                    error: (err) => {
                        this.error = 'Error creating user. Please try again.';
                        this.isLoading = false;
                    }
                })
            );
        }
    }
}