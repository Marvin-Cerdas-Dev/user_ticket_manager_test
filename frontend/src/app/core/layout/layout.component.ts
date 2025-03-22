import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, SidebarComponent],
  template: `
      <div class="d-flex flex-column min-vh-100">
        <app-header></app-header>
        <div class="d-flex flex-grow-1">
          <app-sidebar class="flex-shrink-0"></app-sidebar>
          <main class="flex-grow-1 p-4">
            <router-outlet></router-outlet>
          </main>
        </div>
        <app-footer></app-footer>
      </div>
  `
})
export class LayoutComponent { }

/**
 * LayoutComponent: This component represents the main layout of the application.
 * - The template includes the header, sidebar, main content area, and footer.
 * - The router-outlet directive is used to display the routed views in the main content area.
 */