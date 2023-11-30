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
