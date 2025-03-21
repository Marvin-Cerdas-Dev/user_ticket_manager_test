export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    createdAt: Date;
    updatedAt: Date;
    assignedTo?: string;
}

export interface TicketCreateRequest {
    title: string;
    description: string;
    status: 'open' | 'in-progress' | 'resolved';
}

export interface TicketUpdateRequest {
    title?: string;
    description?: string;
    status?: 'open' | 'in-progress' | 'resolved';
    assignedTo?: string;
}