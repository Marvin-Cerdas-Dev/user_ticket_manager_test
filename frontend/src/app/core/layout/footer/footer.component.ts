import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="app-container flex flex-col h-full">
      <!-- Aquí va el contenido de la página -->
      <main class="flex-1">
        <!-- Contenido principal de la página aquí -->
      </main>

      <footer class="bg-gray-800 text-white p-4 mt-auto">
        <div class="container mx-auto">
          <div class="flex justify-between items-center">
            <p>&copy; {{currentYear}} Ticket System. All rights reserved.</p>
            <div class="flex space-x-4">
              <a href="#" class="hover:underline">Privacy Policy</a>
              <a href="#" class="hover:underline">Terms of Service</a>
              <a href="#" class="hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class FooterComponent {
    currentYear = new Date().getFullYear();
}
