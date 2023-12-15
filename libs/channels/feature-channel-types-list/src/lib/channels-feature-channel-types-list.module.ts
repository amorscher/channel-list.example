import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsDomainModule } from '@channels/domain';
import { ChannelTypesListComponent } from './channel-types-list.component';

@NgModule({
    imports: [CommonModule, ChannelsDomainModule],
    declarations: [ChannelTypesListComponent],
    exports: [ChannelTypesListComponent],
})
export class ChannelsFeatureChannelTypesListModule {}
