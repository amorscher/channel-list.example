import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadChannel, addChannel } from '../+state/channel/channel.actions';
import * as fromChannel from '../+state/channel/channel.reducer';
import * as ChannelSelectors from '../+state/channel/channel.selectors';
import { Channel } from '@channels/domain/entities';

/**
 * Facade for the domain.
 * All application logic is made available through this faced
 */
@Injectable({ providedIn: 'root' })
export class ChannelListFacade {
    loaded$ = this.store.pipe(select(ChannelSelectors.getChannelLoaded));
    channelList$ = this.store.pipe(select(ChannelSelectors.getAllChannel));
    selectedChannel$ = this.store.pipe(select(ChannelSelectors.getSelected));
    ids$ = this.store.pipe(select(ChannelSelectors.getUsedIds));

    constructor(private store: Store<fromChannel.ChannelPartialState>) {}

    /**
     * Loads all the channels
     */
    load(): void {
        this.store.dispatch(loadChannel());
    }

    /**
     * Adds the given channel
     * @param newChannel
     */
    addChannel(newChannel: Channel) {
        this.store.dispatch(addChannel({ newChannel }));
    }
}
