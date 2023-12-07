import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ChannelsFeatureChannelListModule } from '@channels/feature-channel-list';
import { HttpClientModule } from '@angular/common/http';
import { SharedUiBaseComponentsModule } from '@channels/ui-base-components';

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            name: 'Channels App',
            logOnly: isDevMode(),
        }),
        EffectsModule.forRoot(),
        ChannelsFeatureChannelListModule,
        SharedUiBaseComponentsModule,

        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
