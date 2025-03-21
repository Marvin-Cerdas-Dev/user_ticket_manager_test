import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', component: LoginComponent }
];

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AuthModule { }