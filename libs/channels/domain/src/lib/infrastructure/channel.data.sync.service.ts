import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SYNC_EVENT, SyncAction } from '@channels/domain-entities';
import { Action, Store } from '@ngrx/store';
import { ChannelPartialState } from '../+state/channel/channel.reducer';
import { BehaviorSubject } from 'rxjs';
import { findSyncedAction, ngrxNoopAction } from '@channels/util-ngrx';

@Injectable({
    providedIn: 'root',
})
export class ChannelDataSyncService {
    /**
     * stream of actions which are dispatched
     */
    dispatchedActions$: BehaviorSubject<object & Action> = new BehaviorSubject<
        object & Action
    >(ngrxNoopAction());

    /**
     * The socket for sync communication
     */
    socket: Socket;

    constructor(private store: Store<ChannelPartialState>) {
        const socketIOConfig = { path: '/api/sync' };

        this.socket = io(window.location.href, socketIOConfig);
    }

    /**
     * Initializes syncronization btw. different clients
     */
    public initSync() {
        //listen on the socket
        this.socket.on(SYNC_EVENT, (syncAction: SyncAction<string, object>) => {
            const actionCreator = findSyncedAction(syncAction.type);
            //we have an an actionCreator for synchronization so we dispatch the action
            if (actionCreator) {
                const action = actionCreator(syncAction.args);
                this.dispatchedActions$.next(action);
                this.store.dispatch(action);
            }
        });
    }
}
