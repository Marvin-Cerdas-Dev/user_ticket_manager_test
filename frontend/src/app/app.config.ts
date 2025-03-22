import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/auth.interceptor';
import { routes } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes)
  ]
};

/**
 * appConfig: This configuration object provides the application-wide providers.
 * - provideZoneChangeDetection: Configures zone change detection with event coalescing.
 * - provideHttpClient: Configures the HTTP client with interceptors.
 * - provideRouter: Configures the router with the application's routes.
 */