import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPromotion } from '../shared/interfaces/promotion';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

    constructor(
        private http: HttpClient
    ) { }

    getAllPromo(query?: string): Observable<{ promotions: IPromotion[], promotionsCount: number }> {
        return this.http.get<{ promotions: IPromotion[], promotionsCount: number }>(`${API_URL}/promotion?${query || ''}`, { withCredentials: true });
    }
    getThreeLatest(): Observable<IPromotion[]> {
        return this.http.get<IPromotion[]>(`${API_URL}/promotion/threeLatest`, { withCredentials: true });
    }
}
