import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import BookService from '../../services/book-service';
import { Book } from '../../interfaces/book';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'books-table',
  imports: [DatePipe, CurrencyPipe, CommonModule],
  templateUrl: './books-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
  
export default class BooksTable implements OnInit {
  private bookService = inject(BookService);
  private router = inject(Router);

  books = signal<Book[]>([]);
  loading = signal<Boolean>(false);
  error = signal<string | null>(null);

  public books$: Observable<Book[]> = this.bookService.getBooks();

  loadBooks(): void {
    this.loading.set(true);
    this.error.set(null);
    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => {
        this.books.set(data);
        this.loading.set(false);
      },
      error: (err: any) => {
        this.error.set(`Failed to load books: ${err.message || err}`);
        this.loading.set(false);
      }
    });
  }
  
  ngOnInit(): void {
    this.loadBooks();
  }

  onAddBook(): void {
    this.router.navigate(['/new-book']);
  }

  onEditBook(bookId: number): void {
    this.router.navigate(['/edit-book', bookId]);
  }

  onDeleteBook(bookId: number): void {
    if(confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          alert('Libro eliminado exitosamente.');
          this.loadBooks();
        },
        error: (err) => {
          console.error('Error al eliminar el libro:', err);
          alert('Error al eliminar el libro. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }
}

