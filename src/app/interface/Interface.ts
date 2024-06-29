export interface usuario{
    "username": String,
    "email": String,
    "password": String,
}
export interface usersend{
  "username": String,
  "password": String,
}
export interface autor{
    "nombre": string,
    "apellido": string,
    "slug": string
  }
  export interface book {
      "name": string,
      "autor": string,
      "price": number,
      "is_free": boolean,
      "book_file": string,
      "preview_book": string,
      "slug": string,
      "image":string,
      "merchant_uuid": string
  }
  export  interface Book {
    name: string;
    autor: string;
    price: number;
    books:{
      "original":string,
      "preview":string,
    }
    is_free: boolean;
    book_file: string;
    preview_book: string;
    slug: string;
    image: string;
    merchant_uuid: string;
    image_url:string;
    preview_url:string;
  }
export interface token{
    token:string
  }