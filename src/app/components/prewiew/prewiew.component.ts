import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmptyError, empty } from 'rxjs';
import { BookService } from 'src/app/servicios/Services';
import { Router } from '@angular/router';
import { Book } from 'src/app/interface/Interface';

@Component({
  selector: 'app-prewiew',
  templateUrl: './prewiew.component.html',
  styleUrls: ['./prewiew.component.css']
})
export class PrewiewComponent  {
  constructor(private http:HttpClient,private servicio:BookService,private router:Router ){

    const bookslug =this.servicio.getBookSlug()
if(bookslug===""){
    this.router.navigate(['/home'])

}
   
    const bookurl=`http://127.0.0.1:8000/books/${bookslug}/`
    this.http.get<Book>(bookurl).subscribe(data=>{
      this.bookpreview=data;
      console.log(this.bookpreview)
      this.bookpreview.image_url=`http://127.0.0.1:8000/get_image/${this.bookpreview.slug}/`;
      this.bookpreview.preview_url=`http://127.0.0.1:8000/preview_pdf/${this.bookpreview.books.preview}/`
      console.log(this.bookpreview.preview_url)
    }
    )
  }
 bookpreview!:Book;
 ngOnInit(){
 }

}
