import { Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { AuthGuard } from '../../auth/auth.guard';

export const TICKETS_ROUTES: Routes = [
    {
        path: '',
        component: TicketListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'create',
        component: TicketEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':id',
        component: TicketDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':id/edit',
        component: TicketEditComponent,
        canActivate: [AuthGuard]
    }
];

/**
 * Routes configuration for the tickets feature module.
 * - '' (root path): Displays the TicketListComponent and requires authentication.
 * - 'create': Displays the TicketEditComponent for creating a new ticket and requires authentication.
 * - ':id': Displays the TicketDetailComponent for viewing a specific ticket and requires authentication.
 * - ':id/edit': Displays the TicketEditComponent for editing a specific ticket and requires authentication.
 */