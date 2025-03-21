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

    get f() { return this.registerForm.controls; }

    onSubmit(): void {
        this.submitted = true;

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

        this.authService.register(user)
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: () => {
                    this.success = true;
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 3000);
                },
                error: error => {
                    this.error = error.error.message || 'Registration failed';
                }
            });
    }
}