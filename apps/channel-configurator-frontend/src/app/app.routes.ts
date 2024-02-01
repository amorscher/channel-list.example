import { Route } from '@angular/router';
import { ChannelDetailsComponent } from '@channels/feature-channel-details';
import { ChannelListComponent } from '@channels/feature-channel-list';
import { ChannelTypesListComponent } from '@channels/feature-channel-type-list';

export const appRoutes: Route[] = [
    { path: 'channels', component: ChannelListComponent },
    { path: 'channels/:channelId', component: ChannelDetailsComponent },
    { path: 'channeltypes', component: ChannelTypesListComponent },
    { path: '', redirectTo: '/channels', pathMatch: 'full' },
];
