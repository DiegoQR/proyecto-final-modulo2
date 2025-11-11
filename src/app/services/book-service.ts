import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export default class BookService {
  
  private httpRequest = inject(HttpClient);
  private url: string = 'http://localhost:3000/books';

    getBooks(): Observable<Book[]> {
        return this.httpRequest.get<Book[]>(this.url);
    }

    getBookById(id: number): Observable<Book> {
        return this.httpRequest.get<Book>(`${this.url}/${id}`);
    }

    createBook(book: Book): Observable<Book> {
        return this.httpRequest.post<Book>(this.url, book);
    }

    updateBook(id: number, book: Book): Observable<Book> {
        return this.httpRequest.put<Book>(`${this.url}/${id}`, book);
    }

    deleteBook(id: number): Observable<void> {
        return this.httpRequest.delete<void>(`${this.url}/${id}`);
    }

}
