import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IOrder, ISales } from '../shared/interfaces';

const API_URL = environment.API_URL;
@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private http: HttpClient
    ) { }

    getAllOrders(): Observable<{ orders: IOrder[], ordersCount: number }> {
        return this.http.get<{ orders: IOrder[], ordersCount: number }>(`${API_URL}/order/admin`, { withCredentials: true });
    }

    getVolumeProduct(): Observable<{ labels: string[], sales: string[] }> {
        return this.http.get<{ labels: string[], sales: string[] }>(`${API_URL}/order/admin/products/volume`, { withCredentials: true });
    }

    getSalesProduct(): Observable<{ sales: ISales, totalSales: number }> {
        return this.http.get<{ sales: ISales, totalSales: number }>(`${API_URL}/order/admin/products/sales`, { withCredentials: true });
    }

}
