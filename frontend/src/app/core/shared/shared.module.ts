import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        AuthGuard
    ],
    exports: [
        HttpClientModule
    ]
})
export class SharedModule {
    /**
     * Provides a way to configure the module with providers.
     * @returns An object with the module and providers.
     */
    static forRoot() {
        return {
            ngModule: SharedModule,
            providers: [
                AuthService,
                AuthGuard
            ]
        };
    }
}

/**
 * SharedModule: This module provides shared services and modules across the application.
 * - CommonModule: Provides common directives like ngIf and ngFor.
 * - HttpClientModule: Provides HTTP services for making HTTP requests.
 * - AuthService: Provides authentication services.
 * - AuthGuard: Guards routes to ensure only authenticated users can access them.
 * - forRoot: Provides a way to configure the module with providers.
 */