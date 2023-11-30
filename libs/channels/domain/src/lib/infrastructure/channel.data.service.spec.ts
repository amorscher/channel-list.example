import {
    HttpClient,
    HttpClientModule,
    HttpHeaders,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockedHttpClient } from '@channels/test-utils';
import { ChannelDataService } from './channel.data.service';
import { take, firstValueFrom } from 'rxjs';
import { Channel } from '@channels/domain/entities';

describe('ChannelDataService', () => {
    let itemUnderTest: ChannelDataService;
    const mockedHttpClient = new MockedHttpClient();
    let getSpy: jest.SpyInstance;
    let postSpy: jest.SpyInstance;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: HttpClient,
                    useValue: mockedHttpClient,
                },
            ],
        }).compileComponents();
        itemUnderTest = TestBed.inject(ChannelDataService);
        getSpy = jest.spyOn(mockedHttpClient, 'get');
        postSpy = jest.spyOn(mockedHttpClient, 'post');
    });

    it('load should trigger http request', async () => {
        //GIVEN
        const headers = new HttpHeaders().set('Accept', 'application/json');

        //WHEN
        await firstValueFrom(itemUnderTest.load().pipe(take(1)));

        //THEN
        expect(getSpy).toHaveBeenCalledWith('/api/channels', { headers });
    });

    it('add should trigger http request', async () => {
        //GIVEN
        const headers = new HttpHeaders().set('Accept', 'application/json');
        headers.set('Content-type', 'application/json');
        const newChannel: Channel = {
            id: -1,
            name: 'name',
            description: 'desc',
            type: 'DigitalInput',
        };

        //WHEN
        await firstValueFrom(itemUnderTest.add(newChannel).pipe(take(1)));

        //THEN
        expect(postSpy).toHaveBeenCalledWith('/api/channels', newChannel, {
            headers,
        });
    });
});
