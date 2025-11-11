import { Router } from "@angular/router";
import { Book } from "../../interfaces/book";
import BookService from "../../services/book-service";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import BooksTable from "./books-table";
import { of } from "rxjs";
import 'zone.js';

describe("BooksTable Component Tests", () => {
    let component: BooksTable;
    let fixture: ComponentFixture<BooksTable>;
    let bookService: jasmine.SpyObj<BookService>;
    let router: jasmine.SpyObj<Router>;

    const mockBooks: Book[] = [
        {
            id: 1,
            title: "Cien años de soledad",
            author: "Gabriel García Márquez",
            publisher: "Editorial Sudamericana",
            genre: "Realismo mágico",
            publicationDate: new Date("1967-05-30"),
            price: 18.99,
            stock: 45
        },
        {
            id: 2,
            title: "1984",
            author: "George Orwell",
            publisher: "Secker & Warburg",
            genre: "Distopía",
            publicationDate: new Date("1949-06-08"),
            price: 15.99,
            stock: 67
        },
    ]
    beforeEach(async () => {
        const bookServiceSpy = jasmine.createSpyObj('BookService', ['getBooks', 'deleteBook', 'updateBook']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
        imports: [BooksTable],
        providers: [
            { provide: BookService, useValue: bookServiceSpy },
            { provide: Router, useValue: routerSpy }
        ]
        }).compileComponents();

        bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

        bookService.getBooks.and.returnValue(of(mockBooks));

        fixture = TestBed.createComponent(BooksTable);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load books on initialization', () => {
        fixture.detectChanges();

        component.ngOnInit();

        expect(component.books()).toEqual(mockBooks);
        expect(bookService.getBooks).toHaveBeenCalled();
        expect(component.loading()).toBeFalse();
        expect(component.error()).toBeNull();
    });

    it("should navigate to new book page on add book", () => {
        component.onAddBook();
        expect(router.navigate).toHaveBeenCalledWith(['/new-book']);
    });

    it("should navigate to edit book page on edit book", () => {
        const bookId = 5;

        component.onEditBook(bookId);
        expect(router.navigate).toHaveBeenCalledWith(['/edit-book', bookId]);
    });

    it("should delete book and reload books on delete book", () => {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(window, 'alert');
        const bookId = 1;

        fixture.detectChanges();
        bookService.deleteBook.and.returnValue(of(void 0));
        component.onDeleteBook(bookId);

        expect(bookService.deleteBook).toHaveBeenCalledWith(bookId);
        expect(window.alert).toHaveBeenCalledWith('Libro eliminado exitosamente.');
        expect(bookService.getBooks).toHaveBeenCalledTimes(2);
    });

    it("should not delete book if user cancels", () => {
        spyOn(window, 'confirm').and.returnValue(false);
        const bookId = 1;
        component.onDeleteBook(bookId);

        expect(bookService.deleteBook).not.toHaveBeenCalled();
    });
});