import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import * as AuthActions from '../+store/actions';

import * as userActions from '../+store/actions';
import { IUser } from '../shared/interfaces';
import { Store } from '@ngrx/store';
import { IAuthState } from '../+store/reducers';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    localStorage = localStorage;

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
                   this.store.dispatch(AuthActions.clear_message());
                }
            })
    }

    fetchWishlist() {
        let storage = this.localStorage.getItem('wishlist');
        let currentStorage = [];
        storage ? currentStorage = JSON.parse(this.localStorage.getItem('wishlist') || '') : null;
        currentStorage.forEach((x: { _id: string, productType: string }) => {
            this.store.dispatch(userActions.auto_load_wishlist({ _id: x._id, productType: x.productType }));
        });
    }
    fetchCart() {
        let storage = this.localStorage.getItem('cart');
        let currentStorage = [];
        storage ? currentStorage = JSON.parse(this.localStorage.getItem('cart') || '') : null;
        currentStorage.forEach((x: { _id: string, productType: string, quantity: number }) => {
            this.store.dispatch(userActions.auto_load_cart({ _id: x._id, productType: x.productType, quantity: x.quantity }));
        });
    }
}
