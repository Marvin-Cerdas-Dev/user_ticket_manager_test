import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/features/auth/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AdminGuard } from './core/auth/admin.guard';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'register',
        loadComponent: () => import('./core/features/auth/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'tickets', pathMatch: 'full' },
            {
                path: 'tickets',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./core/features/tickets/ticket-list/ticket-list.component').then(m => m.TicketListComponent)
                    },
                    {
                        path: 'create',
                        loadComponent: () => import('./core/features/tickets/ticket-edit/ticket-edit.component').then(m => m.TicketEditComponent)
                    },
                    {
                        path: ':id/edit',
                        loadComponent: () => import('./core/features/tickets/ticket-edit/ticket-edit.component').then(m => m.TicketEditComponent)
                    },
                    {
                        path: ':id',
                        loadComponent: () => import('./core/features/tickets/ticket-detail/ticket-detail.component').then(m => m.TicketDetailComponent)
                    }
                ]
            },
            {
                path: 'users',
                canActivate: [AdminGuard],
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./core/features/users/user-list/user-list.component').then(m => m.UserListComponent)
                    },
                    {
                        path: ':id/edit',
                        loadComponent: () => import('./core/features/users/user-form/user-form.component').then(m => m.UserFormComponent)
                    },
                    {
                        path: ':id',
                        loadComponent: () => import('./core/features/users/user-detail/user-detail.component').then(m => m.UserDetailComponent)
                    }
                ]
            }
        ]
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

/**
 * AppRoutingModule: This module defines the routes for the application.
 * - routes: An array of route definitions.
 *   - 'login': Route for the login component.
 *   - 'register': Lazy-loaded route for the register component.
 *   - '': Route for the main layout component, protected by AuthGuard.
 *     - 'tickets': Child routes for ticket management.
 *       - '': Route for the ticket list component.
 *       - 'create': Route for the ticket creation component.
 *       - ':id/edit': Route for the ticket edit component.
 *       - ':id': Route for the ticket detail component.
 *     - 'users': Child routes for user management, protected by AdminGuard.
 *       - '': Route for the user list component.
 *       - ':id/edit': Route for the user edit component.
 *       - ':id': Route for the user detail component.
 *   - '': Redirects to 'login' if no path is specified.
 *   - '**': Redirects to 'login' for any unknown paths.
 */