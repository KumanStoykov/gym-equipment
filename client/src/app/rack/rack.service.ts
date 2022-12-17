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

    getAll(query?: string): Observable<{ racks: IRack[], racksCount: number }> {
        return this.http.get<{ racks: IRack[], racksCount: number }>(`${API_URL}/rack?${query || ''}`, { withCredentials: true });
    }
    getOne(id: string): Observable<IRack> {
        return this.http.get<IRack>(`${API_URL}/rack/${id}`, { withCredentials: true });
    }

    create(rackData: any): Observable<IRack> {
        return this.http.post<IRack>(`${API_URL}/rack/create`, rackData, { withCredentials: true });
    }
    edit(rackData: any, id: string): Observable<IRack> {
        return this.http.put<IRack>(`${API_URL}/rack/edit/${id}`, rackData, { withCredentials: true });
    }
    delete(id: string): Observable<null> {
        return this.http.delete<null>(`${API_URL}/rack/delete/${id}`, { withCredentials: true });
    }
}
