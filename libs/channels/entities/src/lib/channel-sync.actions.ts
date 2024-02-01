import { Channel } from './channel';
import { createSyncAction } from './sync.actions';

/**
 * Concrete sync actions for the channel domain
 */

export const ADD_CHANNEL_SUCCESS_ACTION = '[Channel] Add Channel Success';

export interface AddChannelSuccessActionParams {
    newChannel: Channel;
}

/**
 * Creates a ADD_CHANNEL_SUCCESS_ACTION
 * @param param the created channel
 * @returns
 */
export function createAddChannelSyncAction(newChannel: Channel) {
    return createSyncAction<
        typeof ADD_CHANNEL_SUCCESS_ACTION,
        AddChannelSuccessActionParams
    >(ADD_CHANNEL_SUCCESS_ACTION, { newChannel });
}


export const UPDATE_CHANNEL_SUCCESS_ACTION = '[Channel] Update Channel Success';
export interface UpdateChannelSuccessActionParams {
    updatedChannel: Channel;
}
/**
 * Creates a UPDATE_CHANNEL_SUCCESS_ACTION
 * @param param the updated channel
 * @returns
 */
export function createUpdateChannelSyncAction(updatedChannel: Channel) {
    return createSyncAction<
        typeof UPDATE_CHANNEL_SUCCESS_ACTION,
        UpdateChannelSuccessActionParams
    >(UPDATE_CHANNEL_SUCCESS_ACTION, { updatedChannel });
}
