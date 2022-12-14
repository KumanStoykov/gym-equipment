import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { IUser } from '../shared/interfaces';

const API_URL = environment.API_URL;

@Injectable({
	providedIn: 'root'
})
export class UserService {

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
}
