import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ChannelSelectors from '../+state/channel/channel.selectors';
import { Channel } from '@channels/domain-entities';
import { updateChannel } from '../+state/channel/channel.actions';
import { ChannelListFacade } from './channel-list.facade';


@Injectable({ providedIn: 'root' })
export class ChannelDetailsFacade {

    loaded$ = this.channelListFacade.loaded$;

    constructor(private store: Store, private channelListFacade: ChannelListFacade) { }

    channelById(uid: string) {
        return this.store.pipe(select(ChannelSelectors.getChannelById(uid)));

    }
    updateChannel(toUpdate: Channel) {
        return this.store.dispatch(updateChannel({ toUpdate }))
    }

    load() {
        this.channelListFacade.load();
    }
}
