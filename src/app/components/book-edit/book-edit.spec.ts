import { ComponentFixture, TestBed } from "@angular/core/testing";
import BookEdit from "./book-edit";
import BookService from "../../services/book-service";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";

describe("BookEdit Component Tests", () => {
    const idMockBook = 3;

    let component: BookEdit;
    let fixture: ComponentFixture<BookEdit>;
    let bookService: jasmine.SpyObj<BookService>;
    let router: jasmine.SpyObj<Router>;
    let activatedRoute: ActivatedRoute;
    let activatedRouteStub: any = {
        snapshot: {
            paramMap: {
                get: (key: string) => idMockBook.toString()
            }
        }
    };

    beforeEach(async () => {
        const bookServiceSpy = jasmine.createSpyObj('BookService', ['getBookById', 'updateBook']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
        imports: [BookEdit],
        providers: [
            { provide: BookService, useValue: bookServiceSpy },
            { provide: Router, useValue: routerSpy },
            { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
        }).compileComponents();

        bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        activatedRoute = TestBed.inject(ActivatedRoute);

        fixture = TestBed.createComponent(BookEdit);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it("should load book data on init", () => {
        const mockBook = {
            id: idMockBook,
            title: "El amor en los tiempos del cólera",
            author: "Gabriel García Márquez",
            publisher: "Editorial Oveja Negra",
            genre: "Romance",
            publicationDate: new Date("1985-09-05"),
            price: 20.00,
            stock: 30
        };
        
        bookService.getBookById.and.returnValue(of(mockBook));

        component.ngOnInit();
        expect(bookService.getBookById).toHaveBeenCalled();
        expect(component.bookForm.value).toEqual(jasmine.objectContaining(mockBook));
    });

    it('should show error message on missing title', () => {
        const newBook = {
            id: idMockBook,
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
        expect(bookService.updateBook).not.toHaveBeenCalled();
    });
    
    it('should show error message on missing author', () => {
        const newBook = {
            id: idMockBook,
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
        expect(bookService.updateBook).not.toHaveBeenCalled();
    });
    
    it('should show error message on missing publisher', () => {
        const newBook = {
            id: idMockBook,
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
        expect(bookService.updateBook).not.toHaveBeenCalled();
    });

    it('should show error message on missing genre', () => {
        const newBook = {
            id: idMockBook,
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
        expect(bookService.updateBook).not.toHaveBeenCalled();
    });

    it('should show error message on missing date', () => {
        const newBook = {
            id: idMockBook,
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
        expect(bookService.updateBook).not.toHaveBeenCalled();
    });

    it('should show error message on missing price', () => {
        const newBook = {
            id: idMockBook,
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
        expect(bookService.updateBook).not.toHaveBeenCalled();
    });

    it('should show error message on price below zero', () => {
        const newBook = {
            id: idMockBook,
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
        expect(bookService.updateBook).not.toHaveBeenCalled();
    });

    it('should show error message on missing stock', () => {
        const newBook = {
            id: idMockBook,
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
        expect(bookService.updateBook).not.toHaveBeenCalled();
    });

    it('should show error message on stock below zero', () => {
        const newBook = {
            id: idMockBook,
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
        expect(bookService.updateBook).not.toHaveBeenCalled();
    });
});