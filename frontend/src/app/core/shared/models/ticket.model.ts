/**
 * Interface representing a ticket.
 */
export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    createdAt: Date;
    updatedAt: Date;
    assignedTo?: string;
}

/**
 * Interface representing the request payload for creating a ticket.
 */
export interface TicketCreateRequest {
    title: string;
    description: string;
    status: 'open' | 'in-progress' | 'resolved';
    assignedTo?: string;
}

/**
 * Interface representing the request payload for updating a ticket.
 */
export interface TicketUpdateRequest {
    title?: string;
    description?: string;
    status?: 'open' | 'in-progress' | 'resolved';
    assignedTo?: string;
}