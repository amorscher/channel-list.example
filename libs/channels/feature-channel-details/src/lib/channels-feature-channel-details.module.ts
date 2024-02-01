import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelDetailsComponent } from './channel-details.component';
import { ChannelsDomainModule } from '@channels/domain';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, ChannelsDomainModule, FormsModule, ReactiveFormsModule],
    declarations: [ChannelDetailsComponent],
    exports: [ChannelDetailsComponent],
})
export class ChannelsFeatureChannelDetailsModule { }
