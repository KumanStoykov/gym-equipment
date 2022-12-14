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

    getAll(query?: string): Observable<{ treadmills: ITreadmill[], treadmillsCount: number }> {
        return this.http.get<{ treadmills: ITreadmill[], treadmillsCount: number }>(`${API_URL}/treadmill?${query || ''}`, { withCredentials: true });
    }
    getOne(id: string): Observable<ITreadmill> {
        return this.http.get<ITreadmill>(`${API_URL}/treadmill/${id}`, { withCredentials: true });
    }

    create(treadmillData: any): Observable<ITreadmill> {
        return this.http.post<ITreadmill>(`${API_URL}/treadmill/create`, treadmillData, { withCredentials: true });
    }
    edit(treadmillData: any, id: string): Observable<ITreadmill> {
        return this.http.put<ITreadmill>(`${API_URL}/treadmill/edit/${id}`, treadmillData, { withCredentials: true });
    }
    delete(id: string): Observable<null> {
        return this.http.delete<null>(`${API_URL}/treadmill/delete/${id}`, { withCredentials: true });
    }
}




