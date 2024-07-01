import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy,Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Noticia, usersend } from 'src/app/interface/Interface';
import { BookService } from 'src/app/servicios/Services';

declare var Swiper: any;
interface Book {
  name: string;
  autor: string;
  price: number;
  is_free: boolean;
  book_file: string;
  preview_book: string;
  slug: string;
  image: string;
  merchant_uuid: string;
  image_url:string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit  {
  books!:Book[];
  filteredOptions!:Book[];
  noticias!:Noticia[];
  constructor(private router: Router,private http:HttpClient, private servicio:BookService) {
    this.http.get("http://127.0.0.1:8000/noticia/").subscribe(data=>{
      this.noticias = Object.values(data);
      console.log(data)
      console.log(this.noticias.length)
      for (let i = 0; i < this.noticias.length; i++) {
       this.noticias[i].imagen=`http://127.0.0.1:8000/get_photo_noticia/${this.noticias[i].slug}`;
      }
    })
    console.log(this.noticias)
    this.http.get("http://127.0.0.1:8000/books/").subscribe(data=>{
      this.books = Object.values(data);
      console.log(data)
      console.log(this.books.length)
      this.books.forEach(book => {
    book.image_url=`http://127.0.0.1:8000/get_image/${book.slug}/`
    
      });
      this.filteredOptions=this.books
    })
    
  }
  ngOnInit(){
    
  }

  logout(){
    localStorage.removeItem('user');
   this.router.navigate(['/login'])
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
 
  onBookClick(x:string){
    console.log("aqui entro")
    this.servicio.setBookSlug(x),
    this.router.navigate(['/preview'])
  }
 
}