import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsDomainModule } from '@channels/domain';
import { ChannelListComponent } from './channel-list.component';

@NgModule({
    imports: [CommonModule, ChannelsDomainModule],
    declarations: [ChannelListComponent],
    exports: [ChannelListComponent],
})
export class ChannelsFeatureChannelListModule {}
