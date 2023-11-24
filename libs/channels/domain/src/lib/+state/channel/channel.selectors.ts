import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CHANNEL_FEATURE_KEY,
  State,
  ChannelPartialState,
  channelAdapter,
} from './channel.reducer';

// Lookup the 'Channel' feature state managed by NgRx
export const getChannelState = createFeatureSelector<
  ChannelPartialState,
  State
>(CHANNEL_FEATURE_KEY);

const { selectAll, selectEntities } = channelAdapter.getSelectors();

export const getChannelLoaded = createSelector(
  getChannelState,
  (state: State) => state.loaded
);

export const getChannelError = createSelector(
  getChannelState,
  (state: State) => state.error
);

export const getAllChannel = createSelector(getChannelState, (state: State) =>
  selectAll(state)
);

export const getChannelEntities = createSelector(
  getChannelState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getChannelState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getChannelEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
