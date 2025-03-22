import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app-container flex flex-col h-full">
      <!-- Footer section -->
      <footer class="bg-gray-800 text-white  p-4 mt-auto">
        <div class="container mx-auto">
          <div class="text-white bg-dark text-center">
            <p b>&copy; {{currentYear}} Created by: Marvin Cerdas Angulo</p>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}

/**
 * FooterComponent: This component represents the footer section of the application.
 * - currentYear: Holds the current year to display in the footer.
 * - The template includes the main content area and the footer with creator name.
 */