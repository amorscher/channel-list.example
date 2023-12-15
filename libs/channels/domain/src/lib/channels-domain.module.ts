import * as fromChannelType from './+state/channel-type/channel-type.reducer';
import * as fromChannel from './+state/channel/channel.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelEffects } from './+state/channel/channel.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ChannelTypeEffects } from './+state/channel-type/channel-type.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(
            fromChannel.CHANNEL_FEATURE_KEY,
            fromChannel.reducer
        ),
        EffectsModule.forFeature([ChannelEffects]),
        StoreModule.forFeature(
            fromChannelType.CHANNELTYPE_FEATURE_KEY,
            fromChannelType.reducer
        ),
        EffectsModule.forFeature([ChannelTypeEffects]),
    ],
})
export class ChannelsDomainModule {}
