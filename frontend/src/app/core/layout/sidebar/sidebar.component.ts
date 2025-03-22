// sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="bg-gray-100 w-64 min-h-screen p-4 border-r">
      <div class="mb-6">
        <h2 class="text-lg font-semibold text-gray-800">Menu</h2>
      </div>
      <nav>
        <ul class="space-y-2">
          <li>
            <a routerLink="/dashboard" routerLinkActive="bg-gray-200" 
               class="block p-2 rounded hover:bg-gray-200 transition-colors">
              <span class="ml-2">Dashboard</span>
            </a>
          </li>
          <li>
            <a routerLink="/tickets" routerLinkActive="bg-gray-200"
               class="block p-2 rounded hover:bg-gray-200 transition-colors">
              <span class="ml-2">My Tickets</span>
            </a>
          </li>
          <li>
            <a routerLink="/tickets/create" routerLinkActive="bg-gray-200"
               class="block p-2 rounded hover:bg-gray-200 transition-colors">
              <span class="ml-2">Create Ticket</span>
            </a>
          </li>
          <li *ngIf="isAdmin">
            <a routerLink="/admin/users" routerLinkActive="bg-gray-200"
               class="block p-2 rounded hover:bg-gray-200 transition-colors text-blue-600">
              <span class="ml-2">User Management</span>
            </a>
          </li>
           <li class="mt-8">
            <button (click)="onLogout()"
                   class="block w-full p-2 rounded text-left hover:bg-red-100 transition-colors text-red-600">
              <span class="ml-2">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  `,
})
export class SidebarComponent implements OnInit {
  isAdmin = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  onLogout(): void {
    this.authService.logout();
  }
}