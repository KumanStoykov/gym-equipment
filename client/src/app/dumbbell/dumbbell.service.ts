import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IDumbbell } from '../shared/interfaces';

const API_URL = environment.API_URL;


@Injectable({
    providedIn: 'root'
})
export class DumbbellService {
    constructor(
        private http: HttpClient
    ) { }

    getAll(query?: string): Observable<{ dumbbells: IDumbbell[], dumbbellsCount: number }> {
        return this.http.get<{ dumbbells: IDumbbell[], dumbbellsCount: number }>(`${API_URL}/dumbbell?${query || ''}`, { withCredentials: true });
    }
    getOne(id: string): Observable<IDumbbell> {
        return this.http.get<IDumbbell>(`${API_URL}/dumbbell/${id}`, { withCredentials: true });
    }

    create(dumbbellData: any): Observable<IDumbbell> {
        return this.http.post<IDumbbell>(`${API_URL}/dumbbell/create`, dumbbellData, { withCredentials: true });
    }
}
