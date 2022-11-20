import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ITreadmill } from '../shared/interfaces';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class TreadmillService {

    constructor(
        private http: HttpClient,
    ) { }

    create(treadmillData: any): Observable<ITreadmill> {
        return this.http.post<ITreadmill>(`${API_URL}/treadmill/create`, treadmillData, { withCredentials: true });
    }


}




