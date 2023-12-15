import { ChannelType } from '@channels/domain-entities';

/**
 * View model to be used by all views using a channel.
 * This will have a derived state having its type resolved to a real ChannelType instance
 */
export interface ChannelViewModel {
    id: string;
    name: string;
    description: string;
    type: ChannelType;
    creationDate?: number;
}
