import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    flush,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import {
    ChannelDataService,
    ChannelListFacade,
    ChannelsDomainModule,
} from '@channels/domain';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { ChannelListComponent } from './channel-list.component';
import {
    Observable,
    of,
    take,
    lastValueFrom,
    animationFrameScheduler,
} from 'rxjs';
import {
    ScrollingModule,
    CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { dispatchFakeEvent } from '@channels/test-utils';
import { Channel } from '@channels/domain/entities';

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
}

describe('ChannelListComponent', () => {
    let fixture: ComponentFixture<ChannelListComponent>;
    let application: ChannelListFacade;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                EffectsModule.forRoot([]),
                StoreModule.forRoot(),
                ScrollingModule,
                ChannelsDomainModule,
            ],
            providers: [
                {
                    provide: ChannelDataService,
                    useClass: ChannelDataServiceMock,
                },
            ],
            declarations: [ChannelListComponent],
        }).compileComponents();
        application = TestBed.inject(ChannelListFacade);
        fixture = TestBed.createComponent(ChannelListComponent);

        //we have to set the heigth as jsdom does not layouting components--> so we mock the height
        const viewport = (fixture.nativeElement as HTMLElement).querySelector(
            'cdk-virtual-scroll-viewport'
        );

        jest.spyOn(viewport, 'clientHeight', 'get').mockImplementation(
            () => fixture.componentInstance.virtualScrollConfig.sizeInPx
        );
    });

    it('should create only visible items on init', fakeAsync(async () => {
        //GIVEN
        application.load();
        await lastValueFrom(application.channelList$.pipe(take(1)));

        fixture.componentInstance.virtualScrollConfig.maxBufferInPx = 0;
        fixture.componentInstance.virtualScrollConfig.minBufferInPx = 0;

        //WHEN --> just init
        finishInit(fixture);

        //THEN --> we will just have 500/25 items = 20
        const compiled = fixture.nativeElement as HTMLElement;
        const result = compiled.querySelectorAll('tr');

        const { sizeInPx, itemSizeInPx, maxBufferInPx, minBufferInPx } =
            fixture.componentInstance.virtualScrollConfig;
        expect(result.length).toBe(
            (sizeInPx + maxBufferInPx + minBufferInPx) / itemSizeInPx
        );
    }));

    it('should create only visible items on init with threshold', fakeAsync(async () => {
        //GIVEN
        application.load();
        await lastValueFrom(application.channelList$.pipe(take(1)));
        fixture.componentInstance.virtualScrollConfig.maxBufferInPx = 100;
        fixture.componentInstance.virtualScrollConfig.minBufferInPx = 100; // 4 additional items with item size 25

        //WHEN --> just init
        finishInit(fixture);

        //THEN --> we will just have 500(displayed size)/25 (itemSize) +100 (Buffer)/25 items = 24
        const compiled = fixture.nativeElement as HTMLElement;
        const result = compiled.querySelectorAll('tr');

        const { sizeInPx, itemSizeInPx, minBufferInPx } =
            fixture.componentInstance.virtualScrollConfig;
        expect(result.length).toBe((sizeInPx + minBufferInPx) / itemSizeInPx); // no scrolling has taken place so just the minBuffer is applied
    }));

    it('should create only visible items with threshold when scrolled', fakeAsync(async () => {
        //GIVEN
        application.load();
        await lastValueFrom(application.channelList$.pipe(take(1)));
        fixture.componentInstance.virtualScrollConfig.maxBufferInPx = 200; // 8 additional items with item size 25
        fixture.componentInstance.virtualScrollConfig.minBufferInPx = 100; // 4 additional items with item size 25
        finishInit(fixture);

        //WHEN --> we scroll to an offset
        const childDebugElement = fixture.debugElement.query(
            By.directive(CdkVirtualScrollViewport)
        );
        triggerScroll(
            childDebugElement.componentInstance,
            200 /*above the min buffer so we get the max number of items*/
        );
        fixture.detectChanges();
        flush();

        //THEN --> we will just have 500(displayed size)/25 (itemSize)+100 (minBuffer)/25 (itemSize) +200 (maxBuffer)/25 items = 28
        const compiled = fixture.nativeElement as HTMLElement;
        const result = compiled.querySelectorAll('tr');

        const { sizeInPx, itemSizeInPx, maxBufferInPx, minBufferInPx } =
            fixture.componentInstance.virtualScrollConfig;

        //max number of items possibly rendered: there will never be more
        expect(result.length).toBe(
            (sizeInPx + minBufferInPx + maxBufferInPx) / itemSizeInPx
        );
    }));
});

/** Trigger a scroll event on the viewport (optionally setting a new scroll offset). */
function triggerScroll(viewport: CdkVirtualScrollViewport, offset?: number) {
    if (offset !== undefined) {
        //we fake the scroll so we just set scrollTop property
        viewport.scrollable.getElementRef().nativeElement.scrollTop = offset;
    }

    dispatchFakeEvent(
        viewport.scrollable.getElementRef().nativeElement,
        'scroll'
    );
    animationFrameScheduler.flush();
}

/** Finish initializing the virtual scroll component at the beginning of a test.
 * Code is taken from https://github.com/angular/components/blob/main/src/cdk/scrolling/virtual-scroll-viewport.spec.ts  */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function finishInit(fixture: ComponentFixture<any>) {
    // On the first cycle we render and measure the viewport.
    fixture.detectChanges();
    flush();

    // On the second cycle we render the items.
    fixture.detectChanges();
    flush();

    // Flush the initial fake scroll event.
    animationFrameScheduler.flush();
    flush();
    fixture.detectChanges();
}
