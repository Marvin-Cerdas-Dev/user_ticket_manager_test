import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { TICKETS_ROUTES } from './tickets.routes';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forChild(TICKETS_ROUTES),
        TicketListComponent,
        TicketDetailComponent,
        TicketEditComponent
    ]
})
export class TicketsModule { }