import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { IComment } from '../shared/interfaces';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    subCommentCreated$$ = new Subject<IComment>();
    subCommentEdit$$ = new Subject<IComment>();
    subCommentDelete$$ = new Subject<IComment>();

    constructor(
        private http: HttpClient
    ) { }

    getById(commentId: string): Observable<IComment> {
        return this.http.get<IComment>(`${API_URL}/comment/current/${commentId}`, { withCredentials: true });
    }
    getAllComments(productId: string, page: number = 1): Observable<{ comments: IComment[], commentsCount: number }> {
        return this.http.get<{ comments: IComment[], commentsCount: number }>(`${API_URL}/comment?product=${productId}&page=${page}`, { withCredentials: true });
    }
    crateComment(comment: any, productId: string, productName: string): Observable<IComment> {
        return this.http.post<IComment>(`${API_URL}/comment/create`, { comment, productId, productName }, { withCredentials: true })
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    return throwError(() => err)
                }),
                tap(comment => {
                    this.subCommentCreated$$.next(comment);
                })
            );
    }
    editPost(comment: any, commentId: string): Observable<IComment> {
        return this.http.put<IComment>(`${API_URL}/comment/edit/${commentId}`, { comment }, { withCredentials: true })
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    return throwError(() => err)
                }),
                tap(comment => {
                    this.subCommentEdit$$.next(comment);
                })
            );
    }
    deletePost(commentId: string): Observable<IComment> {
        return this.http.delete<IComment>(`${API_URL}/comment/delete/${commentId}`, { withCredentials: true })
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    return throwError(() => err)
                }),
                tap(comment => {
                    this.subCommentDelete$$.next(comment);
                })
            );
    }

    getByBrands(product: string, query: string): Observable<{ brands: string[] }> {
        return this.http.get<{ brands: string[] }>(`${API_URL}/${product}/brands${query}`);
    }
    getByProducts(query: string): Observable<{ products: string[] }> {
        return this.http.get<{ products: string[] }>(`${API_URL}/promotion/products${query}`);
    }
}
