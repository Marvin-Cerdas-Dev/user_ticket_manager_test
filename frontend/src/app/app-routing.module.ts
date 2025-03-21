import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/features/auth/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'tickets',
        loadChildren: () => import('./core/features/tickets/tickets.module').then(m => m.TicketsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./core/features/auth/register/register.component').then(c => c.RegisterComponent)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }