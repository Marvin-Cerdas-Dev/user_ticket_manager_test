// src/app/admin/users/user-form/user-form.component.ts
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
        // Verificar si el usuario es administrador
        this.isAdmin = this.authService.isAdmin();

        this.subscription.add(
            this.authService.isAdmin$().subscribe(isAdmin => {
                this.isAdmin = isAdmin;
                if (!isAdmin) {
                    this.router.navigate(['/dashboard']);
                }
            })
        );

        // Inicializar el formulario
        this.initForm();

        // Obtener el ID del usuario de la URL si existe
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
        this.subscription.unsubscribe();
    }

    initForm(): void {
        this.userForm = this.fb.group({
            fullName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', this.isEditing ? [] : [Validators.required, Validators.minLength(6)]],
            role: ['user', [Validators.required]]
        });
    }

    loadUserData(id: string): void {
        this.isLoading = true;
        this.subscription.add(
            this.userService.getUserById(id).subscribe({
                next: (user) => {
                    this.userForm.patchValue({
                        fullName: user.fullName,
                        email: user.email,
                        // No establecemos el password ya que es un campo sensible
                        role: user.role
                    });
                    this.isLoading = false;
                },
                error: (err) => {
                    this.error = 'Error loading user data. Please try again.';
                    this.isLoading = false;
                    console.error('Error loading user data', err);
                }
            })
        );
    }

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
                        console.error('Error updating user', err);
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
                        console.error('Error creating user', err);
                    }
                })
            );
        }
    }
}