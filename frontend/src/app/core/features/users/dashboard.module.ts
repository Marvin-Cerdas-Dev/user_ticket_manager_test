import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../../auth/auth.guard';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({

    imports: [
        DashboardComponent,
        SharedModule, // Agregado
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class DashboardModule { }