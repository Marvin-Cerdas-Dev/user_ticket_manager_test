import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { finalize } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
    providers: [AuthService]
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    error = '';
    returnUrl = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        // Redirect to the return URL if the user is already logged in
        if (this.authService.isLoggedIn()) {
            this.router.navigateByUrl(this.returnUrl);
        }

        // Initialize the login form with email and password fields
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        // Get the return URL from the route parameters or default to '/tickets'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/tickets';
    }

    // Getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    /**
     * Handles the form submission for login.
     */
    onSubmit(): void {
        // Stop if the form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.error = '';

        // Perform the login action
        this.authService.login(this.loginForm.value)
            .pipe(finalize(() => {
                this.loading = false;
            }))
            .subscribe({
                next: (user) => {
                    // Redirect to the return URL on successful login
                    setTimeout(() => {
                        this.router.navigate([this.returnUrl]);
                    }, 100);
                },
                error: (error) => {
                    // Display an error message on login failure
                    this.error = error.error?.message || 'Invalid credentials';
                }
            });
    }
}