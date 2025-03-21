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