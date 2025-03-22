import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/features/auth/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';
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