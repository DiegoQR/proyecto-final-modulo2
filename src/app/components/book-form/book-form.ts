import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../../interfaces/book';
import BookService from '../../services/book-service';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BookForm {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private bookService = inject(BookService);

  public bookForm: FormGroup;

  constructor() {
    this.bookForm = this.fb.group({
      id:[0],
      title: [''],
      author: [''],
      publisher: [''],
      genre: [''],
      publicationDate: [''],
      price: [''],
      stock: [''],
    });
  }
  
  onSubmit(): void {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      this.bookService.createBook(newBook).subscribe({
        next: () => {
          alert(`Nuevo libro añadido: ${newBook.title} por ${newBook.author}`);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al crear el libro:', err);
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
