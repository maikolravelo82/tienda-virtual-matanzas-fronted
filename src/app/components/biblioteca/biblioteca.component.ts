import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book, usersend } from 'src/app/interface/Interface';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent {
  books!:Book[];
  filteredOptions!:Book[];
  booksfree!:Book[];

constructor(private http:HttpClient,private router:Router){
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
onBookClick(x:string){
  x="filexgl5sz"
  const ussuario = localStorage.getItem('user');
  if (ussuario !== null) {
    const user:usersend = JSON.parse(ussuario);
      console.log(user)
  // Obtener el token de autenticación
  this.http.post<any>("http://127.0.0.1:8000/api-token-auth", user)
    .subscribe(data => {
      console.log(data)
      const tokenUser = {
        token: data.token
      };
      const headers = new HttpHeaders().set('Authorization', `Token ${tokenUser.token}`);
      // Configurar las opciones HTTP con el token
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Token ${tokenUser.token}`
          
        })
        
      };
      const url = `http://127.0.0.1:8000/pdfs/${x}/`;

      // Hacer la solicitud HTTP con los encabezados
      this.http.get(url,httpOptions).subscribe(
        (response) => {
          console.log(response)
          window.open(url, '_blank',);

        },
        (error) => {
          // Manejar el error de la solicitud HTTP
          window.open(url, '_blank');
        }
      );
    })
 
    // Navegar a la ruta con el encabezado
 
}
}
}
