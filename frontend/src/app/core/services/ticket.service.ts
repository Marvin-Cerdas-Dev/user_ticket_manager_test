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

    private mapTicket(ticket: any): Ticket {
        return {
            ...ticket,
            id: ticket._id
        };
    }

    private mapTickets(tickets: any[]): Ticket[] {
        return tickets.map(ticket => this.mapTicket(ticket));
    }

    getTickets(): Observable<Ticket[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map(tickets => this.mapTickets(tickets))
        );
    }

    getTicketById(id: string): Observable<Ticket> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            map(ticket => this.mapTicket(ticket))
        );
    }

    getTicketByUserId(id: string): Observable<Ticket> {
        return this.http.get<any>(`${this.apiUrl}/user/${id}`).pipe(
            map(ticket => this.mapTicket(ticket))
        );
    }


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


    updateTicket(id: string, ticket: TicketUpdateRequest): Observable<Ticket> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, ticket).pipe(
            map(ticket => this.mapTicket(ticket))
        );
    }


    deleteTicket(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}