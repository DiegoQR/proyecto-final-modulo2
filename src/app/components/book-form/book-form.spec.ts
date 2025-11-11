import { ComponentFixture, TestBed } from "@angular/core/testing";
import BookForm from "./book-form";
import BookService from "../../services/book-service";
import { Router } from "@angular/router";
import { of } from "rxjs";



describe("BooksForm Component Tests", () => {
    let component: BookForm;
    let fixture: ComponentFixture<BookForm>;
    let bookService: jasmine.SpyObj<BookService>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const bookServiceSpy = jasmine.createSpyObj('BookService', ['getBookById', 'createBook', 'updateBook']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        

        await TestBed.configureTestingModule({
        imports: [BookForm],
        providers: [
            { provide: BookService, useValue: bookServiceSpy },
            { provide: Router, useValue: routerSpy }
        ]
        }).compileComponents();

        bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

        fixture = TestBed.createComponent(BookForm);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should create a new book', () => {
        const newBook = {
            id: 3,
            title: "El amor en los tiempos del cólera",
            author: "Gabriel García Márquez",
            publisher: "Editorial Oveja Negra",
            genre: "Romance",
            publicationDate: new Date("1985-09-05"),
            price: 20.00,
            stock: 30
        };  
        bookService.createBook.and.returnValue(of(newBook));

        component.bookForm.setValue(newBook);
        component.onSubmit();

        expect(bookService.createBook).toHaveBeenCalledWith(jasmine.objectContaining(newBook));
        expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should show error message on missing title', () => {
        const newBook = {
            id: 4,
            title: "",
            author: "Gabriel García Márquez",
            publisher: "Editorial Oveja Negra",
            genre: "Romance",
            publicationDate: new Date("1985-09-05"),
            price: 20.00,
            stock: 30
        };

        component.bookForm.setValue(newBook);
        component.onSubmit();

        expect(component.getErrorMessage('title')).toBe('title es requerido');
        expect(bookService.createBook).not.toHaveBeenCalled();
    });
    
    it('should show error message on missing author', () => {
        const newBook = {
            id: 4,
            title: "El amor en los tiempos del cólera",
            author: "",
            publisher: "Editorial Oveja Negra",
            genre: "Romance",
            publicationDate: new Date("1985-09-05"),
            price: 20.00,
            stock: 30
        };

        component.bookForm.setValue(newBook);
        component.onSubmit();

        expect(component.getErrorMessage('author')).toBe('author es requerido');
        expect(bookService.createBook).not.toHaveBeenCalled();
    });
    
    it('should show error message on missing publisher', () => {
        const newBook = {
            id: 4,
            title: "El amor en los tiempos del cólera",
            author: "Gabriel García Márquez",
            publisher: "",
            genre: "Romance",
            publicationDate: new Date("1985-09-05"),
            price: 20.00,
            stock: 30
        };

        component.bookForm.setValue(newBook);
        component.onSubmit();

        expect(component.getErrorMessage('publisher')).toBe('publisher es requerido');
        expect(bookService.createBook).not.toHaveBeenCalled();
    });

    it('should show error message on missing genre', () => {
        const newBook = {
            id: 4,
            title: "El amor en los tiempos del cólera",
            author: "Gabriel García Márquez",
            publisher: "Editorial Oveja Negra",
            genre: "",
            publicationDate: new Date("1985-09-05"),
            price: 20.00,
            stock: 30
        };

        component.bookForm.setValue(newBook);
        component.onSubmit();

        expect(component.getErrorMessage('genre')).toBe('genre es requerido');
        expect(bookService.createBook).not.toHaveBeenCalled();
    });

    it('should show error message on missing date', () => {
        const newBook = {
            id: 4,
            title: "El amor en los tiempos del cólera",
            author: "Gabriel García Márquez",
            publisher: "Editorial Oveja Negra",
            genre: "Romance",
            publicationDate: null,
            price: 20.00,
            stock: 30
        };

        component.bookForm.setValue(newBook);
        component.onSubmit();

        expect(component.getErrorMessage('publicationDate')).toBe('publicationDate es requerido');
        expect(bookService.createBook).not.toHaveBeenCalled();
    });

    it('should show error message on missing price', () => {
        const newBook = {
            id: 4,
            title: "El amor en los tiempos del cólera",
            author: "Gabriel García Márquez",
            publisher: "Editorial Oveja Negra",
            genre: "Romance",
            publicationDate: new Date("1985-09-05"),
            price: null,
            stock: 30
        };

        component.bookForm.setValue(newBook);
        component.onSubmit();

        expect(component.getErrorMessage('price')).toBe('price es requerido');
        expect(bookService.createBook).not.toHaveBeenCalled();
    });

    it('should show error message on price below zero', () => {
        const newBook = {
            id: 4,
            title: "El amor en los tiempos del cólera",
            author: "Gabriel García Márquez",
            publisher: "Editorial Oveja Negra",
            genre: "Romance",
            publicationDate: new Date("1985-09-05"),
            price: -10.00,
            stock: 30
        };

        component.bookForm.setValue(newBook);
        component.onSubmit();

        expect(component.getErrorMessage('price')).toBe('price debe ser al menos 0');
        expect(bookService.createBook).not.toHaveBeenCalled();
    });

    it('should show error message on missing stock', () => {
        const newBook = {
            id: 4,
            title: "El amor en los tiempos del cólera",
            author: "Gabriel García Márquez",
            publisher: "Editorial Oveja Negra",
            genre: "Romance",
            publicationDate: new Date("1985-09-05"),
            price: 20.00,
            stock: null
        };

        component.bookForm.setValue(newBook);
        component.onSubmit();

        expect(component.getErrorMessage('stock')).toBe('stock es requerido');
        expect(bookService.createBook).not.toHaveBeenCalled();
    });

    it('should show error message on stock below zero', () => {
        const newBook = {
            id: 4,
            title: "El amor en los tiempos del cólera",
            author: "Gabriel García Márquez",
            publisher: "Editorial Oveja Negra",
            genre: "Romance",
            publicationDate: new Date("1985-09-05"),
            price: 20.00,
            stock: -5
        };

        component.bookForm.setValue(newBook);
        component.onSubmit();

        expect(component.getErrorMessage('stock')).toBe('stock debe ser al menos 0');
        expect(bookService.createBook).not.toHaveBeenCalled();
    });

});