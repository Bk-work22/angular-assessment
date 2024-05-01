import { Issues } from "./issues.model";

export interface ResponseModel {
    incomplete_results?: boolean;
    items?: Issues[];
    total_count?: number | any;
}