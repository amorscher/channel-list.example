import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';

import { ChannelDataSyncService } from './channel.data.sync.service';
import {
    SYNC_EVENT,
    createAddChannelSyncAction,
} from '@channels/domain-entities';

import { ChannelsDomainModule } from '../channels-domain.module';
import { firstValueFrom, lastValueFrom, take } from 'rxjs';
import { ChannelListFacade } from '../application/channel-list.facade';
import { fakeServerEmit, mSocket } from '../../test-setup';

describe('ChannelDataSyncService', () => {
    let itemUnderTest: ChannelDataSyncService;
    let facade: ChannelListFacade;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                EffectsModule.forRoot([]),
                StoreModule.forRoot(),
                ChannelsDomainModule,
            ],
            providers: [],
        }).compileComponents();
        mSocket.listeners = [];
        itemUnderTest = TestBed.inject(ChannelDataSyncService);
        facade = TestBed.inject(ChannelListFacade);
    });

    it('should sync one add channel created by other client', async () => {
        //GIVEN

        //WHEN --> server emits add channel sync action which means other client created a channel
        fakeServerEmit(
            SYNC_EVENT,
            createAddChannelSyncAction({
                id: (1234).toString(),
                name: 'test',
                description: 'test',
                type: 'DigitalInput',
            })
        );
        //THEN --> add channel action should be dispatched
        const dispatchedAction = await firstValueFrom(
            itemUnderTest.dispatchedActions$.pipe(take(1))
        );

        expect(dispatchedAction).toMatchSnapshot();

        //channel should be created
        const newChannels = await lastValueFrom(
            facade.channelList$.pipe(take(1))
        );
        //we have one channel
        expect(newChannels.length).toBe(1);
    });

    it('should sync multiple channel created by other clients', async () => {
        //GIVEN

        //WHEN --> server emits add channel sync action which means other client created a channel
        for (let index = 0; index < 10; index++) {
            fakeServerEmit(
                SYNC_EVENT,
                createAddChannelSyncAction({
                    id: index.toString(),
                    name: 'test',
                    description: 'test',
                    type: 'DigitalInput',
                })
            );
        }

        //THEN --> add channel action should be dispatched
        const dispatchedAction = await firstValueFrom(
            itemUnderTest.dispatchedActions$.pipe(take(1))
        );

        expect(dispatchedAction).toMatchSnapshot();

        //channels should be created
        const newChannels = await lastValueFrom(
            facade.channelList$.pipe(take(1))
        );
        //we have 10 channels
        expect(newChannels.length).toBe(10);
    });
});
