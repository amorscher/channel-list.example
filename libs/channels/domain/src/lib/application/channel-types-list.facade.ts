import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadChannelType } from '../+state/channel-type/channel-type.actions';
import * as fromChannelType from '../+state/channel-type/channel-type.reducer';
import * as ChannelTypeSelectors from '../+state/channel-type/channel-type.selectors';

@Injectable({ providedIn: 'root' })
export class ChannelTypesListFacade {
    loaded$ = this.store.pipe(
        select(ChannelTypeSelectors.getChannelTypeLoaded)
    );
    channelTypeList$ = this.store.pipe(
        select(ChannelTypeSelectors.getAllChannelType)
    );
    selectedChannelType$ = this.store.pipe(
        select(ChannelTypeSelectors.getSelected)
    );

    constructor(
        private store: Store<fromChannelType.ChannelTypePartialState>
    ) {}

    load(): void {
        this.store.dispatch(loadChannelType());
    }
}
