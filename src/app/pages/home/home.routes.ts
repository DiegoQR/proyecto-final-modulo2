import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../../components/books-table/books-table')
    },
    {
        path: 'new-book',
        loadComponent: () => import('../../components/book-form/book-form')
    }
];

export default homeRoutes;