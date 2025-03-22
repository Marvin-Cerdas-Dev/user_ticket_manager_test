import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../shared/models/ticket.model';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-ticket-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './ticket-detail.component.html'
})
export class TicketDetailComponent implements OnInit {
    ticket: Ticket | null = null;
    isAdmin = false;
    isLoading = true;
    error: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ticketService: TicketService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isAdmin();
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadTicket(id);
        } else {
            this.error = 'Ticket ID not provided';
            this.isLoading = false;
        }
    }

    /**
     * Loads the ticket details by ID.
     * @param id The ID of the ticket to load.
     */
    loadTicket(id: string): void {
        this.ticketService.getTicketById(id).subscribe({
            next: (data) => {
                this.ticket = data;
                this.isLoading = false;
            },
            error: (err) => {
                this.error = 'Error loading ticket. Please try again.';
                this.isLoading = false;
            }
        });
    }

    /**
     * Deletes the current ticket.
     */
    deleteTicket(): void {
        if (!this.ticket) return;

        if (confirm('Are you sure you want to delete this ticket?')) {
            this.ticketService.deleteTicket(this.ticket.id).subscribe({
                next: () => {
                    this.router.navigate(['/tickets']);
                },
                error: (err) => {
                    this.error = 'Error deleting ticket. Please try again.';
                }
            });
        }
    }
}