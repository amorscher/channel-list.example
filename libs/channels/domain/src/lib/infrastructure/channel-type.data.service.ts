import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChannelType } from '@channels/domain-entities';

@Injectable({ providedIn: 'root' })
export class ChannelTypeDataService {
    constructor(private http: HttpClient) {}

    load(): Observable<ChannelType[]> {
        // Uncomment if needed
        /*
        const url = '...';
        const params = new HttpParams().set('param', 'value');
        const headers = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<ChannelType[]>(url, {params, headers});
        */

        const url = '/api/channeltypes';
        const headers = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<ChannelType[]>(url, { headers });
    }
}
