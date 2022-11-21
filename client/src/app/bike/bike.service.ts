import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IBIke } from '../shared/interfaces';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class BikeService {

    constructor(
        private http: HttpClient,
    ) { }

    create(treadmillData: any): Observable<IBIke> {
        return this.http.post<IBIke>(`${API_URL}/bike/create`, treadmillData, { withCredentials: true });
    }
}
