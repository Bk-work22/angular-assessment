import { HttpHeaders } from "@angular/common/http";

export interface RequestOptions {
    body?: any,
    headers?: HttpHeaders,
    params?: any,
}