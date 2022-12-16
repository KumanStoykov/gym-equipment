import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IOrder } from '../shared/interfaces';

const API_URL = environment.API_URL;
@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private http: HttpClient
    ) { }

    getAllOrders(): Observable<{ orders: IOrder[], ordersCount: number}> {
        return this.http.get<{ orders: IOrder[], ordersCount: number}>(`${API_URL}/order/admin`, { withCredentials: true });
    }

}
