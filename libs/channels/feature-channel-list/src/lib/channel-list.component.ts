import { Component, OnInit } from '@angular/core';
import { Channel, ChannelListFacade } from '@channels/domain';

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
    channelList$ = this.channelListFacade.channelList$;

    constructor(private channelListFacade: ChannelListFacade) {}

    ngOnInit() {
        this.load();
    }

    load(): void {
        this.channelListFacade.load();
    }

    trackBy(index: number, item: Channel): number {
        return item.id;
    }

    addChannel() {
        this.channelListFacade.addChannel({
            id: -1,
            name: 'defaultName',
            description: 'defaultDesc',
            type: 'DigitalInput',
        });
    }
}
