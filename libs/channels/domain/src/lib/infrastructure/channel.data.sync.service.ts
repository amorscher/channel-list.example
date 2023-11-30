import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SyncAction } from '@channels/domain/entities';
import { Store } from '@ngrx/store';
import { ChannelPartialState } from '../+state/channel/channel.reducer';
import * as ChannelActions from '../+state/channel/channel.actions';

@Injectable({
    providedIn: 'root',
})
export class ChannelDataSyncService {
    /**
     * The socket for sync communication
     */
    socket: Socket;

    constructor(private store: Store<ChannelPartialState>) {
        this.socket = io(window.location.href, { path: '/api/sync' });
    }

    /**
     * Initializes syncronization btw. different clients
     */
    public initSync() {
        this.socket.on('sync', (syncAction: SyncAction<string, unknown>) => {
            const actionCreator = ChannelActions.syncedActions.get(
                syncAction.type
            );
            if (actionCreator) {
                this.store.dispatch(actionCreator(syncAction.args));
            }
        });
    }
}
