import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpProxy {

    constructor(
        private httpClient: HttpClient,
        //private authService: AppAuthService
    ) { }

    post<T, R>(url: string, body: T) {
        return this.httpClient.post<R>(
            url,
            body,
            {
                headers: this.defaultHeaders
            }
        );
    }

    get<T>(url: string) {
        return this.httpClient.get<T>(
            url,
            {
                headers: this.defaultHeaders,
            }
        );
    }

    put<T>(url: string, body: any) {
        return this.httpClient.put<T>(
            url,
            body,
            {
                headers: this.defaultHeaders
            }
        );
    }

    delete<T>(url: string) {
        return this.httpClient.delete<T>(
            url,
            {
                headers: this.defaultHeaders
            }
        );
    }

    private get defaultHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json'})
        
        /*({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.authService.authToken.jwt}`
        });*/
    }

}
