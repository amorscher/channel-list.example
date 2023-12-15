import { ChannelType } from '@channels/domain-entities';
import { createAction, props } from '@ngrx/store';

export const loadChannelType = createAction('[ChannelType] Load ChannelType');

export const loadChannelTypeSuccess = createAction(
    '[ChannelType] Load ChannelType Success',
    props<{ channelType: ChannelType[] }>()
);

export const loadChannelTypeFailure = createAction(
    '[ChannelType] Load ChannelType Failure',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props<{ error: any }>()
);
