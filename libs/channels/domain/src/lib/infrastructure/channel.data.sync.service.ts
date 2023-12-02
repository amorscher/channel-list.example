import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SYNC_EVENT, SyncAction } from '@channels/domain-entities';
import { Store } from '@ngrx/store';
import { ChannelPartialState } from '../+state/channel/channel.reducer';
import { BehaviorSubject, Subject } from 'rxjs';
import * as ChannelActions from '../+state/channel/channel.actions';

@Injectable({
    providedIn: 'root',
})
export class SyncConfig {
    port = -1;
}

@Injectable({
    providedIn: 'root',
})
export class ChannelDataSyncService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatchedActions$: BehaviorSubject<any> = new BehaviorSubject({});
    /**
     * The socket for sync communication
     */
    socket: Socket;

    constructor(
        private config: SyncConfig,
        private store: Store<ChannelPartialState>
    ) {
        const socketIOConfig =
            this.config.port === -1
                ? { path: '/api/sync' }
                : { path: '/api/sync', port: config?.port };
        this.socket = io(window.location.href, socketIOConfig);
    }

    /**
     * Initializes syncronization btw. different clients
     */
    public initSync() {
        this.socket.on(
            SYNC_EVENT,
            (syncAction: SyncAction<string, unknown>) => {
                const actionCreator = ChannelActions.syncedActions.get(
                    syncAction.type
                );
                if (actionCreator) {
                    const action = actionCreator(syncAction.args);
                    this.dispatchedActions$.next(action);
                    this.store.dispatch(action);
                }
            }
        );
    }
}
