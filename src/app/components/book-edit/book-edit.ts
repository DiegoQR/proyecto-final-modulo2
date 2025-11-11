import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../../interfaces/book';
import BookService from '../../services/book-service';

@Component({
  selector: 'app-book-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-edit.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BookEdit implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private bookService = inject(BookService);

  public bookForm: FormGroup;
  bookId: number = 0;

  constructor() {
    this.bookForm = this.fb.group({
      id:[Math.floor(Math.random() * 1000000)],
      title: [''],
      author: [''],
      publisher: [''],
      genre: [''],
      publicationDate: [''],
      price: [''],
      stock: [''],
    });
  }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.bookId) {
      this.loadBookData();
    }
  }

  loadBookData(): void {
    this.bookService.getBookById(this.bookId).subscribe({
      next: (book: Book) => {
        this.bookForm.patchValue(book);
      },
      error: (err) => {
        console.error('Error al cargar los datos del libro:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const editedBook: Book = this.bookForm.value;
      this.bookService.updateBook(this.bookId, editedBook).subscribe({
        next: () => {
          alert(`Libro ${editedBook.title} editado`);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al editar el libro:', err);
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
