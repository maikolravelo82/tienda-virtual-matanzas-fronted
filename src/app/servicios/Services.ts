import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _bookSlug: string = '';

  setBookSlug(slug: string) {
    this._bookSlug = slug;
  }

  getBookSlug(): string {
    return this._bookSlug;
  }
}