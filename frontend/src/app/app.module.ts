import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/features/auth/login/login.component';
import { SharedModule } from './core/shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        SharedModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

/**
 * AppModule: The root module of the application.
 * - declarations: Declares the components that belong to this module.
 *   - AppComponent: The root component of the application.
 *   - LoginComponent: The login component for user authentication.
 * - imports: Imports other modules that are required by this module.
 *   - BrowserModule: Provides services that are essential to launch and run a browser app.
 *   - SharedModule: Provides shared services and modules across the application.
 *   - AppRoutingModule: Provides the application's routing configuration.
 *   - HttpClientModule: Provides HTTP services for making HTTP requests.
 * - bootstrap: Specifies the root component that Angular should bootstrap when it starts the application.
 */