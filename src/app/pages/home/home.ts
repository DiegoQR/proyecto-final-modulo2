import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BooksTable } from "../../components/books-table/books-table";

@Component({
  selector: 'app-home',
  imports: [BooksTable],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home { }
