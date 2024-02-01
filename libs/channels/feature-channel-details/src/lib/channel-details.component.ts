import { Component, signal, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelDetailsFacade } from '@channels/domain';
import { Channel } from '@channels/domain-entities';
import { switchMap, take } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
    selector: 'channels-channel-details',
    templateUrl: './channel-details.component.html',
    styleUrls: ['./channel-details.component.scss'],
})
export class ChannelDetailsComponent {

    selectedChannel: Signal<Channel | undefined> = signal<Channel | undefined>(undefined);


    channelForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
    });


    constructor(private channelDetailsFacade: ChannelDetailsFacade, private activatedRoute: ActivatedRoute) {

        this.selectedChannel = toSignal(this.activatedRoute.params.pipe(
            switchMap(param => {
                const channelId = param["channelId"];
                return this.channelDetailsFacade.channelById(channelId);
            })
        ))

    }

    ngOnInit() {
        this.load();
    }

    load(): void {
        this.channelDetailsFacade.loaded$.pipe(
            take(1)
        )
            .subscribe(loaded => {
                if (!loaded) {
                    this.channelDetailsFacade.load();
                }
            })

    }

    public updateChannel() {
        const channel = this.selectedChannel();
        if (channel) {
            let updatedChannel: Channel = { ...channel, name: "changedName", description: "changedDescription" }
            const formData = this.channelForm.value;
            if (formData.name && formData.description) {

                updatedChannel = { ...channel, name: formData.name, description: formData.description }

            }
            this.channelDetailsFacade.updateChannel(updatedChannel);
        }
    }





}
