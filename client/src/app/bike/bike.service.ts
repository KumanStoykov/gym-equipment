import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IBike } from '../shared/interfaces';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class BikeService {

    constructor(
        private http: HttpClient,
    ) { }

    getAll(query?:  string): Observable<{ bikes: IBike[], bikesCount: number }> {
        return this.http.get<{ bikes: IBike[], bikesCount: number }>(`${API_URL}/bike?${query || ''}`, { withCredentials: true });
    }
    getOne(id: string): Observable<IBike> {
        return this.http.get<IBike>(`${API_URL}/bike/${id}`, { withCredentials: true });
    }
    create(bikeData: any): Observable<IBike> {
        return this.http.post<IBike>(`${API_URL}/bike/create`, bikeData, { withCredentials: true });
    }
    edit(bikeData: any, id: string): Observable<IBike> {
        return this.http.put<IBike>(`${API_URL}/bike/edit/${id}`, bikeData, { withCredentials: true });
    }
    delete(id: string): Observable<null> {
        return this.http.delete<null>(`${API_URL}/bike/delete/${id}`, { withCredentials: true });
    }
}
