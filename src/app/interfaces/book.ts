export interface BookList {
    books: Book[];
}

export interface Book {
    id:              number;
    title:           string;
    author:          string;
    publisher:       string;
    genre:           string;
    publicationDate: Date;
    price:           number;
    stock:           number;
}
