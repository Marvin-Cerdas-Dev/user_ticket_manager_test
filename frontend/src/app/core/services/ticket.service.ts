import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket, TicketCreateRequest, TicketUpdateRequest } from '../shared/models/ticket.model';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    private apiUrl = 'http://localhost:3000/api/ticket';

    constructor(private http: HttpClient) { }

    /**
     * Maps a single ticket object from the backend format to the frontend format.
     * @param ticket The ticket object from the backend.
     * @returns The mapped ticket object.
     */
    private mapTicket(ticket: any): Ticket {
        return {
            ...ticket,
            id: ticket._id
        };
    }

    /**
     * Maps an array of ticket objects from the backend format to the frontend format.
     * @param tickets The array of ticket objects from the backend.
     * @returns The array of mapped ticket objects.
     */
    private mapTickets(tickets: any[]): Ticket[] {
        return tickets.map(ticket => this.mapTicket(ticket));
    }

    /**
     * Fetches all tickets from the server.
     * @returns An observable of an array of tickets.
     */
    getTickets(): Observable<Ticket[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map(tickets => this.mapTickets(tickets))
        );
    }

    /**
     * Fetches a ticket by its ID from the server.
     * @param id The ID of the ticket to fetch.
     * @returns An observable of the ticket.
     */
    getTicketById(id: string): Observable<Ticket> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            map(ticket => this.mapTicket(ticket))
        );
    }

    /**
     * Fetches a ticket by the user ID from the server.
     * @param id The ID of the user.
     * @returns An observable of the ticket.
     */
    getTicketByUserId(id: string): Observable<Ticket> {
        return this.http.get<any>(`${this.apiUrl}/user/${id}`).pipe(
            map(ticket => this.mapTicket(ticket))
        );
    }

    /**
     * Creates a new ticket on the server.
     * @param ticket The ticket creation request object.
     * @returns An observable of the created ticket.
     */
    createTicket(ticket: TicketCreateRequest): Observable<Ticket> {
        const backendTicket = {
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            assignedUser: ticket.assignedTo
        };

        return this.http.post<{ message: string, ticket: any }>(this.apiUrl, backendTicket)
            .pipe(
                map(response => this.mapTicket(response.ticket))
            );
    }

    /**
     * Updates an existing ticket on the server.
     * @param id The ID of the ticket to update.
     * @param ticket The ticket update request object.
     * @returns An observable of the updated ticket.
     */
    updateTicket(id: string, ticket: TicketUpdateRequest): Observable<Ticket> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, ticket).pipe(
            map(ticket => this.mapTicket(ticket))
        );
    }

    /**
     * Deletes a ticket by its ID from the server.
     * @param id The ID of the ticket to delete.
     * @returns An observable of void.
     */
    deleteTicket(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}