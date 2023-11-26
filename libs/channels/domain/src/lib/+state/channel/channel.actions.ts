import { createAction, props } from '@ngrx/store';
import { Channel } from '../../entities/channel';

export const loadChannel = createAction('[Channel] Load Channel');

export const loadChannelSuccess = createAction(
  '[Channel] Load Channel Success',
  props<{ channel: Channel[] }>()
);

export const loadChannelFailure = createAction(
  '[Channel] Load Channel Failure',
  props<{ error: unknown }>()
);
