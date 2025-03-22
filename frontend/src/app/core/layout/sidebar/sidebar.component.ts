import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="col-1 m-3 p-3">
      <div class="btn-group-vertical" role="group" aria-label="Sidebar Menu">
        <div class="btn-group" role="group">
          <button id="btnTickets" type="button" class="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown" aria-expanded="false">
            Tickets
          </button>
          <ul class="dropdown-menu" aria-labelledby="btnTickets">
            <li><a class="dropdown-item" routerLink="/dashboard">Dashboard</a></li>
            <li><a class="dropdown-item" routerLink="/tickets/create">Create Ticket</a></li>
          </ul>
        </div>
        <div class="btn-group" role="group" *ngIf="isAdmin">
          <button id="btnUsers" type="button" class="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown" aria-expanded="false">
            Users
          </button>
          <ul class="dropdown-menu" aria-labelledby="btnUsers">
            <li><a class="dropdown-item" routerLink="/users">Manage Users</a></li>
          </ul>
        </div>
        <button type="button" class="btn btn-primary" (click)="onLogout()">Logout</button>
      </div>
    </div>
  `,
})
export class SidebarComponent implements OnInit, OnDestroy {
  isAdmin = false;
  private subscription = new Subscription();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Set the initial value of isAdmin
    this.isAdmin = this.authService.isAdmin();

    // Subscribe to changes in the admin status
    this.subscription.add(
      this.authService.isAdmin$().subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      })
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscription.unsubscribe();
  }

  /**
   * Logs out the current user.
   */
  onLogout(): void {
    this.authService.logout();
  }
}

/**
 * SidebarComponent: This component represents the sidebar menu of the application.
 * - isAdmin: Indicates whether the user is an admin.
 * - The template includes navigation links for tickets and user management, and a logout button.
 * - The onLogout method logs out the current user.
 */