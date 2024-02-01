import { createAction, props } from '@ngrx/store';
import {
    ADD_CHANNEL_SUCCESS_ACTION,
    AddChannelSuccessActionParams,
    Channel,
    UPDATE_CHANNEL_SUCCESS_ACTION,
} from '@channels/domain-entities';
import { createSyncedAction } from '@channels/util-ngrx';

export const loadChannel = createAction('[Channel] Load Channel');

export const loadChannelSuccess = createAction(
    '[Channel] Load Channel Success',
    props<{ channel: Channel[] }>()
);

export const loadChannelFailure = createAction(
    '[Channel] Load Channel Failure',
    props<{ error: string | null }>()
);

export const addChannel = createAction(
    '[Channel] Add Channel',
    props<{ newChannel: Channel }>()
);

export const addChannelSuccess = createSyncedAction(
    ADD_CHANNEL_SUCCESS_ACTION,
    props<AddChannelSuccessActionParams>()
);

export const updateChannel = createAction(
    '[Channel] Update Channel',
    props<{ toUpdate: Channel }>()
);

export const updateChannelSuccess = createSyncedAction(
    UPDATE_CHANNEL_SUCCESS_ACTION,
    props<{ updatedChannel: Channel }>()
);



export const addChannelFailure = createAction(
    '[Channel] Add Channel Failure',
    props<{ error: string | null }>()
);
