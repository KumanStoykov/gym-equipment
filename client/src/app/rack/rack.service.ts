import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IRack } from '../shared/interfaces';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class RackService {

    constructor(
        private http: HttpClient
    ) { }

    create(rackData: any): Observable<IRack> {
        return this.http.post<IRack>(`${API_URL}/rack/create`, rackData, { withCredentials: true });
    }
}
