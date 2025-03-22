import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../shared/models/ticket.model';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-ticket-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './ticket-list.component.html'
})
export class TicketListComponent implements OnInit {
    tickets: Ticket[] = [];
    isAdmin = false;
    isLoading = true;
    error: string | null = null;

    constructor(
        private ticketService: TicketService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isAdmin();
        this.loadTickets();
    }

    loadTickets(): void {
        this.isLoading = true;
        this.ticketService.getTickets().subscribe({
            next: (data) => {
                console.log('Tickets received:', data); // Agregado
                this.tickets = data;
                this.isLoading = false;
            },
            error: (err) => {
                this.error = 'Error loading tickets. Please try again.';
                this.isLoading = false;
                console.error('Error loading tickets', err);
            }
        });
    }

    deleteTicket(id: string): void {
        if (confirm('Are you sure you want to delete this ticket?')) {
            this.ticketService.deleteTicket(id).subscribe({
                next: () => {
                    this.tickets = this.tickets.filter(ticket => ticket.id !== id);
                },
                error: (err) => {
                    this.error = 'Error deleting ticket. Please try again.';
                    console.error('Error deleting ticket', err);
                }
            });
        }
    }
}