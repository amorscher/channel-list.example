import { Component, OnInit } from '@angular/core';
import { ChannelListFacade } from '@channels/domain';

@Component({
    selector: 'channels-channel-list',
    templateUrl: './channel-list.component.html',
    styleUrls: ['./channel-list.component.scss'],
})
export class ChannelListComponent implements OnInit {
    channelList$ = this.channelListFacade.channelList$;

    constructor(private channelListFacade: ChannelListFacade) {}

    ngOnInit() {
        this.load();
    }

    load(): void {
        this.channelListFacade.load();
    }
}
