import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Channel } from '../entities/channel';

@Injectable({ providedIn: 'root' })
export class ChannelDataService {

  constructor(private http: HttpClient) {}

  load(): Observable<Channel[]> {
        const url = '/api/channels';
        const headers = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<Channel[]>(url, { headers});

  }
}
