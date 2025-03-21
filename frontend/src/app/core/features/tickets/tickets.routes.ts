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