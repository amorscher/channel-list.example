import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ChannelActions from './channel.actions';
import { ChannelDataService } from '../../infrastructure/channel.data.service';
import { ChannelPartialState } from './channel.reducer';
import * as ChannelSelectors from './channel.selectors';
import { ChannelDataSyncService } from '../../infrastructure/channel.data.sync.service';
import { ngrxNoopAction } from '@channels/util-ngrx';

@Injectable()
export class ChannelEffects {
    loadChannel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChannelActions.loadChannel),
            switchMap(() =>
                this.channelDataService.load().pipe(
                    map((channel) =>
                        ChannelActions.loadChannelSuccess({ channel })
                    ),

                    catchError((error) =>
                        of(ChannelActions.loadChannelFailure({ error }))
                    )
                )
            )
        )
    );

    addChannel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChannelActions.addChannel),
            withLatestFrom(this.store.select(ChannelSelectors.getUsedIds)),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            switchMap(([action, ids]) =>
                this.channelDataService.add(action.newChannel).pipe(
                    //noop action as channel is created when backend notifies all clients using this.syncService
                    map(() => ngrxNoopAction()),
                    catchError((error) =>
                        of(ChannelActions.addChannelFailure({ error }))
                    )
                )
            )
        )
    );

    updateChannel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChannelActions.updateChannel),
            withLatestFrom(this.store.select(ChannelSelectors.getUsedIds)),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            switchMap(([action, ids]) =>
                this.channelDataService.update(action.toUpdate).pipe(
                    //noop action as channel is created when backend notifies all clients using this.syncService
                    map(() => ngrxNoopAction()),
                    catchError((error) =>
                        of(ChannelActions.addChannelFailure({ error }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private channelDataService: ChannelDataService,
        private store: Store<ChannelPartialState>,
        private syncService: ChannelDataSyncService
    ) {
        this.syncService.initSync();
    }
}
