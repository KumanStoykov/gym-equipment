import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IBench } from '../shared/interfaces';

const API_URL = environment.API_URL;
@Injectable({
    providedIn: 'root'
})
export class BenchService {

    constructor(
        private http: HttpClient
    ) { }

    create(benchData: any): Observable<IBench> {
        return this.http.post<IBench>(`${API_URL}/bench/create`, benchData, { withCredentials: true });
    }
}
