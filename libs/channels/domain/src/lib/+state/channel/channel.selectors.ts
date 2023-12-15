import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CHANNEL_FEATURE_KEY, State, channelAdapter } from './channel.reducer';
import { getChannelTypeState } from '../channel-type/channel-type.selectors';
import { ChannelViewModel } from '../../entities/channel-view.model';

// Lookup the 'Channel' feature state managed by NgRx
export const getChannelState =
    createFeatureSelector<State>(CHANNEL_FEATURE_KEY);

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

export const getUsedIds = createSelector(
    getChannelState,
    (state: State) => state.ids
);

/**
 * Selector combining Channel with Channel type providing a view model
 */
export const getAllChannelViewModel = createSelector(
    getAllChannel,
    getChannelTypeState,
    (channels, channelTypesState) => {
        return channels.map((ch) => {
            return {
                ...ch,
                type: channelTypesState.entities[ch.type],
            } as ChannelViewModel;
        });
    }
);
