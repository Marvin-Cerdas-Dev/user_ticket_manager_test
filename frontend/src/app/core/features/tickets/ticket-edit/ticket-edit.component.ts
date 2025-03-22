import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService } from '../../../services/ticket.service';
import { Ticket, TicketCreateRequest, TicketUpdateRequest } from '../../../shared/models/ticket.model';

@Component({
    selector: 'app-ticket-edit',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    templateUrl: './ticket-edit.component.html'
})
export class TicketEditComponent implements OnInit {
    ticketForm!: FormGroup;
    isEditMode = false;
    ticketId: string | null = null;
    isLoading = false;
    isSaving = false;
    error: string | null = null;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private ticketService: TicketService
    ) { }

    ngOnInit(): void {
        this.initForm();

        this.ticketId = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!this.ticketId;

        if (this.isEditMode && this.ticketId) {
            this.loadTicket(this.ticketId);
        }
    }

    initForm(): void {
        this.ticketForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(5)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            status: [{ value: 'open', disabled: !this.isEditMode }],
            assignedTo: ['']
        });
    }

    loadTicket(id: string): void {
        this.isLoading = true;
        this.ticketService.getTicketById(id).subscribe({
            next: (ticket) => {
                this.ticketForm.patchValue({
                    title: ticket.title,
                    description: ticket.description,
                    status: ticket.status,
                    assignedTo: ticket.assignedTo || ''
                });
                this.ticketForm.get('status')?.enable();
                this.isLoading = false;
            },
            error: (err) => {
                this.error = 'Error loading ticket. Please try again.';
                this.isLoading = false;
                console.error('Error loading ticket', err);
            }
        });
    }

    onSubmit(): void {
        if (this.ticketForm.invalid) {
            return;
        }

        this.isSaving = true;

        if (this.isEditMode && this.ticketId) {


            const updateData: TicketUpdateRequest = {
                title: this.ticketForm.value.title,
                description: this.ticketForm.value.description,
                status: this.ticketForm.value.status,
                assignedTo: this.ticketForm.value.assignedTo || undefined
            };

            this.ticketService.updateTicket(this.ticketId, updateData).subscribe({
                next: () => {
                    this.router.navigate(['/tickets', this.ticketId]);
                },
                error: (err) => {
                    this.error = 'Error updating ticket. Please try again.';
                    this.isSaving = false;
                    console.error('Error updating ticket', err);
                }
            });
        } else {
            console.log('SALVANDO EL TICKET...');

            const createData: TicketCreateRequest = {
                title: this.ticketForm.value.title,
                description: this.ticketForm.value.description,
                status: 'open',
                //assignedTo: this.ticketForm.value.assignedTo || undefined
                assignedTo: "67da92fddaab2dcd91e860a9"
            };

            console.log('TICKET =>', createData);

            this.ticketService.createTicket(createData).subscribe({
                next: (newTicket) => {
                    this.router.navigate(['/tickets', newTicket.id]);
                },
                error: (err) => {
                    this.error = 'Error creating ticket. Please try again.';
                    this.isSaving = false;
                    console.error('Error creating ticket', err);
                }
            });
        }
    }
}