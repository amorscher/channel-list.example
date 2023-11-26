import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ChannelActions from './channel.actions';
import { ChannelDataService } from '../../infrastructure/channel.data.service';

@Injectable()
export class ChannelEffects {
  loadChannel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChannelActions.loadChannel),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      switchMap((action) =>
        this.channelDataService.load().pipe(
          map((channel) => ChannelActions.loadChannelSuccess({ channel })),
          catchError((error) =>
            of(ChannelActions.loadChannelFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private channelDataService: ChannelDataService
  ) {}
}
