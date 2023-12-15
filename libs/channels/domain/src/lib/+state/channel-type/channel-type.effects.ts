import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ChannelTypeActions from './channel-type.actions';
import { ChannelTypeDataService } from '../../infrastructure/channel-type.data.service';

@Injectable()
export class ChannelTypeEffects {
    loadChannelType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChannelTypeActions.loadChannelType),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            switchMap((action) =>
                this.channelTypeDataService.load().pipe(
                    map((channelType) =>
                        ChannelTypeActions.loadChannelTypeSuccess({
                            channelType,
                        })
                    ),
                    catchError((error) =>
                        of(ChannelTypeActions.loadChannelTypeFailure({ error }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private channelTypeDataService: ChannelTypeDataService
    ) {}
}
