import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import * as AuthActions from '../+store/actions';

import { IUser } from '../shared/interfaces';
import { Store } from '@ngrx/store';
import { IAuthState } from '../+store/reducers';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private store: Store<IAuthState>
    ) { }

    login(userData: { email: string, password: string }): Observable<IUser> {
        return this.http.post<IUser>(`${API_URL}/user/login`, userData, { withCredentials: true });
    }

    register(userData: { email: string, password: string }): Observable<IUser> {
        return this.http.post<IUser>(`${API_URL}/user/register`, userData, { withCredentials: true });
    }

    logout(): Observable<null> {
        return this.http.get<null>(`${API_URL}/user/logout`, { withCredentials: true });
    }

    checkUser() {
        this.http.get<AuthActions.authSuccess>(`${API_URL}/user/check-user`, { withCredentials: true })
            .subscribe({
                next: (data: AuthActions.authSuccess) => {
                    this.store.dispatch(AuthActions.auth_success({
                        _id: data._id,
                        email: data.email,
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        phone: data.phone || '',
                        address: data.address || '',
                        isAdmin: data.isAdmin
                    }));
                },

                error: () => {
                   this.store.dispatch(AuthActions.auth_fail());
                }
            })
    }
}
