import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      id:[Math.floor(Math.random() * 1000000)],
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      genre: ['', Validators.required],
      publicationDate: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
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

  getErrorMessage(fieldName: string): string{
    const control = this.bookForm.get(fieldName);

    if(control?.hasError('required')){
      return `${fieldName} es requerido`
    }

    if (control?.hasError('minLength')){
      const minLength = control.errors?.['minLength'].requiredLength;
      return `${fieldName} debe tener al menor ${minLength} caracteres`;
    }

    if (control?.hasError('min')){
      const min = control.errors?.['min'].min;
      return `${fieldName} debe ser al menos ${min}`;
    }

    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.bookForm.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
