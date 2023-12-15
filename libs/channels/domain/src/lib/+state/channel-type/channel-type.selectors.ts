import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    CHANNELTYPE_FEATURE_KEY,
    State,
    channelTypeAdapter,
} from './channel-type.reducer';

// Lookup the 'ChannelType' feature state managed by NgRx
export const getChannelTypeState = createFeatureSelector<State>(
    CHANNELTYPE_FEATURE_KEY
);

const { selectAll, selectEntities } = channelTypeAdapter.getSelectors();

export const getChannelTypeLoaded = createSelector(
    getChannelTypeState,
    (state: State) => state.loaded
);

export const getChannelTypeError = createSelector(
    getChannelTypeState,
    (state: State) => state.error
);

export const getAllChannelType = createSelector(
    getChannelTypeState,
    (state: State) => selectAll(state)
);

export const getChannelTypeEntities = createSelector(
    getChannelTypeState,
    (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
    getChannelTypeState,
    (state: State) => state.selectedId
);

export const getSelected = createSelector(
    getChannelTypeEntities,
    getSelectedId,
    (entities, selectedId) => selectedId && entities[selectedId]
);
