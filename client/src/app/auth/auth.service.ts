import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { IUser } from '../shared/interfaces/user';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }

    login(userData: { email: string, password: string }) {
        return this.http.post<IUser>(`${API_URL}/user/login`, userData, { withCredentials: true });
    }

    register(userData: { email: string, password: string }) {
        return this.http.post<IUser>(`${API_URL}/user/register`, userData, { withCredentials: true });
    }
}
