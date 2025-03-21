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
        if (this.authService.isLoggedIn()) {
            this.authService.isLoggedIn() && this.router.navigateByUrl(this.returnUrl);
        }

        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    get f() { return this.loginForm.controls; }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.error = '';

        this.authService.login(this.loginForm.value)
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: () => {
                    this.router.navigate([this.returnUrl]);
                },
                error: error => {
                    this.error = error.error.message || 'Incorrect credentials';
                }
            });
    }

}
