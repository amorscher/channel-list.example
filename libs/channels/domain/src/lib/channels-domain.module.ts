import * as fromChannel from './+state/channel/channel.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelEffects } from './+state/channel/channel.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(
            fromChannel.CHANNEL_FEATURE_KEY,
            fromChannel.reducer
        ),
        EffectsModule.forFeature([ChannelEffects]),
    ],
})
export class ChannelsDomainModule {}
