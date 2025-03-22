import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <header class="bg-primary text-white p-3 shadow">
      <div class="container mx-auto">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <h1 class="text-xl font-bold">Ticket System</h1>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
    isLoggedIn = false;

    constructor(private authService: AuthService) {
        this.isLoggedIn = this.authService.isLoggedIn();
    }

    logout(): void {
        this.authService.logout();
    }
}