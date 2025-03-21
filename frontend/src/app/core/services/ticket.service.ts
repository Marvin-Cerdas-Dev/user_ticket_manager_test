import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket, TicketCreateRequest, TicketUpdateRequest } from '../shared/models/ticket.model';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    private apiUrl = 'http://localhost:3000/api/tickets';

    constructor(private http: HttpClient) { }

    getTickets(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(this.apiUrl);
    }

    getTicketById(id: string): Observable<Ticket> {
        return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
    }

    getTicketByUserId(id: string): Observable<Ticket> {
        return this.http.get<Ticket>(`${this.apiUrl}/user/${id}`);
    }

    createTicket(ticket: TicketCreateRequest): Observable<Ticket> {
        return this.http.post<Ticket>(this.apiUrl, ticket);
    }

    updateTicket(id: string, ticket: TicketUpdateRequest): Observable<Ticket> {
        return this.http.put<Ticket>(`${this.apiUrl}/${id}`, ticket);
    }

    deleteTicket(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}