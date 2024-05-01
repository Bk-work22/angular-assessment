import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./views/home/home.component').then(m => m.AppHomeComponent) },
    { path: 'table', loadComponent: () => import('./views/table/table.component').then(m => m.AppTableComponent) }
];
