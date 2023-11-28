import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsDomainModule } from '@channels/domain';
import { ChannelListComponent } from './channel-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    imports: [CommonModule, ScrollingModule, ChannelsDomainModule],
    declarations: [ChannelListComponent],
    exports: [ChannelListComponent],
})
export class ChannelsFeatureChannelListModule {}
