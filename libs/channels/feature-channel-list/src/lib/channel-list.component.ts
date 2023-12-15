import { Component, OnInit } from '@angular/core';
import {
    ChannelListFacade,
    ChannelTypesListFacade,
    ChannelViewModel,
} from '@channels/domain';

@Component({
    selector: 'channels-channel-list',
    templateUrl: './channel-list.component.html',
    styleUrls: ['./channel-list.component.scss'],
})
export class ChannelListComponent implements OnInit {
    virtualScrollConfig = {
        itemSizeInPx: 25,
        sizeInPx: 500,
        minBufferInPx: 100,
        maxBufferInPx: 150,
    };
    channelList$ = this.channelListFacade.loadedWithViewModel$;

    constructor(
        private channelListFacade: ChannelListFacade,
        private channelTypeFacade: ChannelTypesListFacade
    ) {}

    ngOnInit() {
        this.load();
    }

    load(): void {
        this.channelListFacade.load();
        this.channelTypeFacade.load();
    }

    trackBy(index: number, item: ChannelViewModel): string {
        return item.id;
    }

    addChannel() {
        this.channelListFacade.addChannel({
            id: (-1).toString(),
            name: 'defaultName',
            description: 'defaultDesc',
            type: 'DI',
        });
    }
}
