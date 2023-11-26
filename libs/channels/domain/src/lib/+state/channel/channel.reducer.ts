import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ChannelActions from './channel.actions';
import { Channel } from '../../entities/channel';

export const CHANNEL_FEATURE_KEY = 'channels-channel';

export interface State extends EntityState<Channel> {
    selectedId?: string | number; // which Channel record has been selected
    loaded: boolean; // has the Channel list been loaded
    error?: string | null; // last known error (if any)
}

export interface ChannelPartialState {
    readonly [CHANNEL_FEATURE_KEY]: State;
}

export const channelAdapter: EntityAdapter<Channel> =
    createEntityAdapter<Channel>();

export const initialState: State = channelAdapter.getInitialState({
    // set initial required properties
    loaded: false,
});

const channelReducer = createReducer(
    initialState,
    on(ChannelActions.loadChannel, (state) => ({
        ...state,
        loaded: false,
        error: null,
    })),
    on(ChannelActions.loadChannelSuccess, (state, { channel }) =>
        channelAdapter.upsertMany(channel, { ...state, loaded: true })
    ),
    on(ChannelActions.loadChannelFailure, (state, { error }) => ({
        ...state,
        error,
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return channelReducer(state, action);
}
