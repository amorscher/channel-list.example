import { createAction, ActionCreator, props } from '@ngrx/store';
import {
    ADD_CHANNEL_SUCCESS_ACTION,
    AddChannelSuccessActionParams,
    Channel,
} from '@channels/domain/entities';

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

export const addChannelSuccess = createAction(
    ADD_CHANNEL_SUCCESS_ACTION,
    props<AddChannelSuccessActionParams>()
);

export const addChannelFailure = createAction(
    '[Channel] Add Channel Failure',
    props<{ error: string | null }>()
);

export const syncedActions: Map<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ActionCreator<string, (props: any) => any>
> = new Map();
syncedActions.set(addChannelSuccess.type, addChannelSuccess);

/*
    This action does nothing and should not have
    a reducer function assigned
*/
export const ngrxNoopAction = createAction('[General] No Operation');
