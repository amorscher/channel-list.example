import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadChannel } from '../+state/channel/channel.actions';
import * as fromChannel from '../+state/channel/channel.reducer';
import * as ChannelSelectors from '../+state/channel/channel.selectors';

@Injectable({ providedIn: 'root' })
export class ChannelListFacade {
  loaded$ = this.store.pipe(select(ChannelSelectors.getChannelLoaded));
  channelList$ = this.store.pipe(select(ChannelSelectors.getAllChannel));
  selectedChannel$ = this.store.pipe(select(ChannelSelectors.getSelected));

  constructor(private store: Store<fromChannel.ChannelPartialState>) {}

  load(): void {
    this.store.dispatch(loadChannel());
  }
}
