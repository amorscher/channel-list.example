import { Component, OnInit } from '@angular/core';
import { ChannelTypesListFacade } from '@channels/domain';

@Component({
    selector: 'channels-channel-types-list',
    templateUrl: './channel-types-list.component.html',
    styleUrls: ['./channel-types-list.component.scss'],
})
export class ChannelTypesListComponent implements OnInit {
    channelTypeList$ = this.channelTypesListFacade.channelTypeList$;

    constructor(private channelTypesListFacade: ChannelTypesListFacade) {}

    ngOnInit() {
        this.load();
    }

    load(): void {
        this.channelTypesListFacade.load();
    }
}
