import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [
        CommonModule,
        HttpClientModule
    ],
})
export class DashboardComponent implements OnInit {
    currentUser: User | null = null;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
        });
    }

    logout(): void {
        this.authService.logout();
    }
}
