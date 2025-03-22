import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'user-management-system';
}

/**
 * AppComponent: This is the root component of the application.
 * - title: The title of the application.
 * - The templateUrl points to the HTML template for this component.
 * - The styleUrls points to the SCSS styles for this component.
 */