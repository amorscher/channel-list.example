import { Component } from '@angular/core';

@Component({
    selector: 'channel-list-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'channels';
    themes = [
        {
            id: 'dark',
            name: 'dark',
            color: '#363638',
        },
        {
            id: 'light',
            name: 'light',
            color: '#fffffe',
        },
        {
            id: 'brown',
            name: 'brown',
            color: '#55423d',
        },
        {
            id: 'green',
            name: 'green',
            color: '#004643',
        },
    ];
}
