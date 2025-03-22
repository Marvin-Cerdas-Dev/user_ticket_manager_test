import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { finalize } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
    providers: [AuthService]
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    success = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        // Initialize the registration form with validation rules
        this.registerForm = this.formBuilder.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            role: ['', Validators.required]
        }, {
            validators: this.passwordMatchValidator
        });
    }

    /**
     * Custom validator to check if the password and confirm password fields match.
     * @param control The form control.
     * @returns An object with the validation error or null if valid.
     */
    passwordMatchValidator(control: AbstractControl) {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        if (password !== confirmPassword) {
            control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        } else {
            return null;
        }
    }

    // Getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    /**
     * Handles the form submission for registration.
     */
    onSubmit(): void {
        this.submitted = true;

        // Stop if the form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.error = '';

        const user = {
            fullName: this.f['fullName'].value,
            email: this.f['email'].value,
            password: this.f['password'].value,
            role: this.f['role'].value
        };

        // Perform the registration action
        this.authService.register(user)
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: () => {
                    this.success = true;
                    // Redirect to the login page after a delay
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 3000);
                },
                error: error => {
                    // Display an error message on registration failure
                    this.error = error.error.message || 'Registration failed';
                }
            });
    }
}