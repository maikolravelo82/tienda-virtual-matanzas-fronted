export interface usuario{
    "username": string,
    "email": string,
    "password": string,
}
export interface usersend{
  "username": string,
  "password": string,
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
      "merchant_uuid": string,
      "descripcion":string
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
    descripcion:string
  }
export interface token{
    token:string
  }
  export interface userObject  {
   
      email: string,
      is_staff: true,
      is_superuser: true,
      password: string,
      username: string
    
  }
  export interface Noticia{
    titulo:string,
    imagen:string,
    texto:string,
    slug:string
  }