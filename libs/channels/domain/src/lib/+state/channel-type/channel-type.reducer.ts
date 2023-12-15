import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ChannelTypeActions from './channel-type.actions';
import { ChannelType } from '@channels/domain-entities';

export const CHANNELTYPE_FEATURE_KEY = 'channels-channelType';

export interface State extends EntityState<ChannelType> {
    selectedId?: string | number; // which ChannelType record has been selected
    loaded: boolean; // has the ChannelType list been loaded
    error?: string | null; // last known error (if any)
}

export interface ChannelTypePartialState {
    readonly [CHANNELTYPE_FEATURE_KEY]: State;
}

export const channelTypeAdapter: EntityAdapter<ChannelType> =
    createEntityAdapter<ChannelType>();

export const initialState: State = channelTypeAdapter.getInitialState({
    // set initial required properties
    loaded: false,
});

const channelTypeReducer = createReducer(
    initialState,
    on(ChannelTypeActions.loadChannelType, (state) => ({
        ...state,
        loaded: false,
        error: null,
    })),
    on(ChannelTypeActions.loadChannelTypeSuccess, (state, { channelType }) =>
        channelTypeAdapter.upsertMany(channelType, { ...state, loaded: true })
    ),
    on(ChannelTypeActions.loadChannelTypeFailure, (state, { error }) => ({
        ...state,
        error,
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return channelTypeReducer(state, action);
}
