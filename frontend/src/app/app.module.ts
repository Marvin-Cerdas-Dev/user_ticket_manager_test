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