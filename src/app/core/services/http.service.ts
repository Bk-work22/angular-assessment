import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RequestOptions } from "../models/http.model";
import { Observable, catchError, map } from "rxjs";
import { ResponseModel } from "../models/response.model";
import { accessToken } from "../constants";

@Injectable({
    providedIn: 'root',
})

export class HTTPService {

    constructor(private httpService: HttpClient) {

    }

    /**
     * Make an HTTP request to the provided URL with the given method and optional body.
     * 
     * @param METHOD The HTTP method (GET, POST, PUT, PATCH, DELETE).
     * @param URL The URL to make the request to.
     * @param body The optional request body.
     * @returns An observable of the HTTP response data.
     */

    public requestEntity(
        METHOD: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        URL: string,
        body?: any,
    ): Observable<ResponseModel> {
        let params: HttpParams = new HttpParams();

        // Append body parameters to URL if the method is GET
        if (METHOD === 'GET' && Object.keys(body || {}).length > 0) {
            for (let key in body) {
                if (body.hasOwnProperty(key)) {
                    if (Array.isArray(body[key])) {
                        body[key].forEach((u: any) => {
                            params = params.append(key, u);
                        });
                    } else {
                        params = params.append(key, body[key]);
                    }
                }
            }
        }

        // Construct request options
        const requestOptions: RequestOptions = {
            params: params,
            headers: new HttpHeaders({
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${accessToken}`
            }),
        }

        // Make the HTTP request
        const response: any = this.httpService.request(METHOD, URL, requestOptions).pipe(
            map((response: ResponseModel) => response),
            catchError((error: any) => {
                console.log('App Error: ', error)
                return error;
            })
        )

        return response;
    }
}
