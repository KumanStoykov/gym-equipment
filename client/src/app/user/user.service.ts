import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { IOrder, IUser } from '../shared/interfaces';
import * as AuthActions from '../+store/actions';


const API_URL = environment.API_URL;

@Injectable({
	providedIn: 'root'
})
export class UserService {
    localStorage = localStorage;

	subUserData$$ = new Subject<IUser>();

	constructor(
		private http: HttpClient
	) { }

	loadProfile(): Observable<IUser> {
		return this.http.get<IUser>(`${API_URL}/user/check-user`, { withCredentials: true });
	}
	checkUserCredential(id: string): Observable<IUser> {
		return this.http.get<IUser>(`${API_URL}/user/check-user/${id}`, { withCredentials: true });
	}
	editUser(id: string, userData: IUser): Observable<IUser> {
		return this.http.put<IUser>(`${API_URL}/user/edit/${id}`, userData, { withCredentials: true })
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    return throwError(() => err);
                }),
                tap(user => {
                    this.subUserData$$.next(user);
                })
            );
	}
	delete(id: string): Observable<null> {
		return this.http.delete<null>(`${API_URL}/user/delete/${id}`, { withCredentials: true });
	}

    addToWishlist(product: AuthActions.wishlistProps): Observable<any> {
        let storage = this.localStorage.getItem('wishlist');
        let currentStorage = [];
        storage ? currentStorage = JSON.parse(this.localStorage.getItem('wishlist') || '') : null;
        const isInList = currentStorage.find((x: AuthActions.wishlistProps) => x._id === product._id);

        if(!isInList) {
            currentStorage.push(product);
        }
        this.localStorage.setItem('wishlist', JSON.stringify(currentStorage));
        return of(currentStorage);
    }

    removeFromWishlist(product: AuthActions.wishlistProps): Observable<any> {
        let storage = this.localStorage.getItem('wishlist');
        let currentStorage = [];
        storage ? currentStorage = JSON.parse(this.localStorage.getItem('wishlist') || '') : null;
        const isInList = currentStorage.find((x: AuthActions.wishlistProps) => x._id === product._id);

        if(isInList) {
            const index = currentStorage.indexOf(isInList);
            currentStorage.splice(index, 1);
        }
        this.localStorage.setItem('wishlist', JSON.stringify(currentStorage));
        return of(currentStorage);
    }

    addToCart(product: AuthActions.cartProps): Observable<any> {
        let storage = this.localStorage.getItem('cart');
        let currentStorage = [];
        storage ? currentStorage = JSON.parse(this.localStorage.getItem('cart') || '') : null;
        const isInList = currentStorage.find((x: AuthActions.wishlistProps) => x._id === product._id);

        if(isInList) {
            const index = currentStorage.indexOf(isInList);
            currentStorage[index].quantity = currentStorage[index].quantity + 1;
        } else {
            currentStorage.push(product);
        }

        this.localStorage.setItem('cart', JSON.stringify(currentStorage));
        return of(currentStorage);
    }
    removeFromCart(product: AuthActions.cartProps): Observable<any> {
        let storage = this.localStorage.getItem('cart');
        let currentStorage = [];
        storage ? currentStorage = JSON.parse(this.localStorage.getItem('cart') || '') : null;
        const isInList = currentStorage.find((x: AuthActions.wishlistProps) => x._id === product._id);

        if(isInList) {
            const index = currentStorage.indexOf(isInList);
            currentStorage.splice(index, 1);
        }

        this.localStorage.setItem('cart', JSON.stringify(currentStorage));
        return of(currentStorage);
    }
    increaseQuantityCart(product: AuthActions.cartProps): Observable<any> {
        let storage = this.localStorage.getItem('cart');
        let currentStorage = [];
        storage ? currentStorage = JSON.parse(this.localStorage.getItem('cart') || '') : null;
        const isInList = currentStorage.find((x: AuthActions.wishlistProps) => x._id === product._id);

        if(isInList) {
            isInList.quantity++;
            const index = currentStorage.indexOf(isInList);
            currentStorage.splice(index, 1, isInList);
        }

        this.localStorage.setItem('cart', JSON.stringify(currentStorage));
        return of(currentStorage);
    }
    decreaseQuantityCart(product: AuthActions.cartProps): Observable<any> {
        let storage = this.localStorage.getItem('cart');
        let currentStorage = [];
        storage ? currentStorage = JSON.parse(this.localStorage.getItem('cart') || '') : null;
        const isInList = currentStorage.find((x: AuthActions.wishlistProps) => x._id === product._id);

        if(isInList) {
            isInList.quantity--;
            const index = currentStorage.indexOf(isInList);
            currentStorage.splice(index, 1, isInList);
        }

        this.localStorage.setItem('cart', JSON.stringify(currentStorage));
        return of(currentStorage);
    }

    emptyCart(): Observable<any> {
        this.localStorage.setItem('cart', JSON.stringify([]));
        return of([]);
    }

    createOrder(orderData: any): Observable<IOrder> {
        return this.http.post<IOrder>(`${API_URL}/order/create`, orderData, { withCredentials: true });
    }
}
