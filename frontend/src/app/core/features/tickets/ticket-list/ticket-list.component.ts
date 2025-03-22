import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../shared/models/ticket.model';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-ticket-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './ticket-list.component.html'
})
export class TicketListComponent implements OnInit, OnDestroy {
    tickets: Ticket[] = [];
    isAdmin = false;
    isLoading = true;
    error: string | null = null;
    private subscription = new Subscription();

    constructor(
        private ticketService: TicketService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        // Establecer el valor inicial
        this.isAdmin = this.authService.isAdmin();

        // Suscribirse a cambios
        this.subscription.add(
            this.authService.isAdmin$().subscribe(isAdmin => {
                this.isAdmin = isAdmin;
            })
        );

        this.loadTickets();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadTickets(): void {
        this.isLoading = true;
        this.subscription.add(
            this.ticketService.getTickets().subscribe({
                next: (data) => {
                    this.tickets = data;
                    this.isLoading = false;
                },
                error: (err) => {
                    this.error = 'Error loading tickets. Please try again.';
                    this.isLoading = false;
                    console.error('Error loading tickets', err);
                }
            })
        );
    }

    deleteTicket(id: string): void {
        if (confirm('Are you sure you want to delete this ticket?')) {
            this.subscription.add(
                this.ticketService.deleteTicket(id).subscribe({
                    next: () => {
                        this.tickets = this.tickets.filter(ticket => ticket.id !== id);
                    },
                    error: (err) => {
                        this.error = 'Error deleting ticket. Please try again.';
                        console.error('Error deleting ticket', err);
                    }
                })
            );
        }
    }
}