import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { Observable, of, take, lastValueFrom } from 'rxjs';
import { Channel } from '@channels/domain/entities';
import { ChannelListFacade } from './channel-list.facade';
import { ChannelsDomainModule } from '../channels-domain.module';
import { ChannelDataService } from '../infrastructure/channel.data.service';

class ChannelDataServiceMock {
    constructor(private numberOfChannels = 200) {}

    load(): Observable<Channel[]> {
        const channels: Channel[] = [];
        //lets create 100 channels for testing
        for (let index = 0; index < this.numberOfChannels; index++) {
            const channel: Channel = {
                id: index,
                name: `Name${index}`,
                description: `desc${index}`,
                type: 'DI',
            };
            channels.push(channel);
        }
        return of(channels);
    }
    add(newChannel: Channel): Observable<Channel> {
        return of(newChannel);
    }
}
/**
 * Integration test for the whole functionality provided through the domain.
 */
describe('ChannelListFacade.integration', () => {
    let itemUnderTest: ChannelListFacade;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                EffectsModule.forRoot([]),
                StoreModule.forRoot(),
                ChannelsDomainModule,
            ],
            providers: [
                {
                    provide: ChannelDataService,
                    useClass: ChannelDataServiceMock,
                },
            ],
        }).compileComponents();
        itemUnderTest = TestBed.inject(ChannelListFacade);
    });

    it('should load all channels', fakeAsync(async () => {
        //GIVEN

        //WHEN --> just load
        itemUnderTest.load();
        const channels = await lastValueFrom(
            itemUnderTest.channelList$.pipe(take(1))
        );

        //THEN --> we have 200 channels loaded
        expect(channels.length).toBe(200);
    }));

    it('should add a channel', fakeAsync(async () => {
        //GIVEN
        itemUnderTest.load();
        await lastValueFrom(itemUnderTest.channelList$.pipe(take(1)));
        //WHEN --> just load
        itemUnderTest.addChannel({
            id: -1,
            name: 'name',
            description: 'desc',
            type: 'DigitalInput',
        });

        //THEN --> we have 200 channels loaded
        tick();
        const newChannels = await lastValueFrom(
            itemUnderTest.channelList$.pipe(take(1))
        );
        //still 200 as this will be synced using a socket
        expect(newChannels.length).toBe(200);
    }));
});
