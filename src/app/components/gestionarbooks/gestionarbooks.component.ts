import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/servicios/Services';
import Swal from 'sweetalert2';
interface book {
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
@Component({
  selector: 'app-gestionarbooks',
  templateUrl: './gestionarbooks.component.html',
  styleUrls: ['./gestionarbooks.component.css']
})
export class GestionarbooksComponent {

books!:book[];
  constructor(private router: Router,private http:HttpClient, private servicio:BookService) {
    
    this.http.get("http://127.0.0.1:8000/books/").subscribe(data=>{
      this.books = Object.values(data);
      console.log(data)
      console.log(this.books.length)
      this.books.forEach(book => {
    
      });
    })
    
  }
  saveBook() {
    
  }

  editBook(x:string) {
       const url_delete=`http://127.0.0.1:8000/books/${x}/`
       this.http.delete(url_delete).subscribe(data=>{
        this.router.navigate(['/form-book'])
        console.log(data)
          })
  }

  deleteBook(x:string) {
    const url_delete=`http://127.0.0.1:8000/books/${x}/`
    Swal.fire({
      title: 'Desea eliminar el libro',
      text: "Se perderan todos los datos del libro",
      icon: 'question',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Reiniciar los valores del formulario
        this.http.delete(url_delete).subscribe(data=>{
          window.location.reload();
      console.log(url_delete)
        })
      }
    });
 
  }
}
