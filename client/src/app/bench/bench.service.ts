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

    getAll(query?: string): Observable<{ benches: IBench[], benchesCount: number }> {
        return this.http.get<{ benches: IBench[], benchesCount: number }>(`${API_URL}/bench?${query || ''}`, { withCredentials: true });
    }
    getOne(id: string): Observable<IBench> {
        return this.http.get<IBench>(`${API_URL}/bench/${id}`, { withCredentials: true });
    }

    create(benchData: any): Observable<IBench> {
        return this.http.post<IBench>(`${API_URL}/bench/create`, benchData, { withCredentials: true });
    }
}
