import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ChannelActions from './channel.actions';
import { ChannelDataService } from '../../infrastructure/channel.data.service';
import { ChannelPartialState } from './channel.reducer';
import * as ChannelSelectors from './channel.selectors';

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
            switchMap(([action, ids]) =>
                this.channelDataService.add(action.newChannel).pipe(
                    map(() =>
                        ChannelActions.addChannelSuccess({
                            newChannel: {
                                ...action.newChannel,
                                id: ids.length + 1,
                            },
                        })
                    ),
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
        private store: Store<ChannelPartialState>
    ) {}
}
