export interface BookList {
    books: Book[];
}

export interface Book {
    id:              number;
    title:           string;
    author:          string;
    publisher:       string;
    genre:           string;
    isbn:            string;
    publicationDate: Date;
    pages:           number;
    price:           number;
    stock:           number;
    language:        string;
    country:         string;
    rating:          number;
    available:       boolean;
    bestseller:      boolean;
    description:     string;
}
