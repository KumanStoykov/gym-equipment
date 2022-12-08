import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IComment } from '../shared/interfaces';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class SharedService {

    constructor(
        private http: HttpClient
    ) { }

    getAllComments(productId: string, page: number = 1): Observable<{ comments: IComment[], commentsCount: number }> {
        return this.http.get<{ comments: IComment[], commentsCount: number }>(`${API_URL}/comment?product=${productId}&page=${page}`, { withCredentials: true });
    }
    cratePost(comment: any, productId: string, productName: string): Observable<IComment> {
        return this.http.post<IComment>(`${API_URL}/comment/create`, {comment, productId, productName}, { withCredentials: true });
    }
}
