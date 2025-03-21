import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/features/auth/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';
import { HttpClientModule } from '@angular/common/http';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'register',
        loadComponent: () => import('./core/features/auth/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./core/features/users/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        HttpClientModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }