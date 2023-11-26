import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ChannelsFeatureChannelListModule } from '@channels/feature-channel-list';
import { StoreModule } from '@ngrx/store';
import { ChannelsDomainModule } from '@channels/domain';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                ChannelsFeatureChannelListModule,
                EffectsModule.forRoot([]),
                StoreModule.forRoot(),
                ChannelsDomainModule,
            ],
            declarations: [AppComponent, NxWelcomeComponent],
        }).compileComponents();
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain(
            'channels-channel-list'
        );
    });

    it(`should have as title 'channels'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('channels');
    });
});
