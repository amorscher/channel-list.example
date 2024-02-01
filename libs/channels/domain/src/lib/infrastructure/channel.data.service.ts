import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Channel } from '@channels/domain-entities';

/**
 * Does all the REST stuff with the backend
 */
@Injectable({ providedIn: 'root' })
export class ChannelDataService {
    constructor(private http: HttpClient) { }

    load(): Observable<Channel[]> {
        const url = '/api/channels';
        const headers = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<Channel[]>(url, { headers });
    }
    add(newChannel: Channel) {
        const url = '/api/channels';
        const headers = new HttpHeaders().set('Accept', 'application/json');
        headers.set('Content-type', 'application/json');
        return this.http.post<Channel>(url, newChannel, { headers });
    }

    update(update: Channel) {
        const url = `/api/channels/${update.id}`;
        const headers = new HttpHeaders().set('Accept', 'application/json');
        headers.set('Content-type', 'application/json');
        return this.http.patch<Channel>(url, update, { headers });
    }
}
