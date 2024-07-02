import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book, usersend ,autor} from 'src/app/interface/Interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent {
  books!:Book[];
  filteredOptions!:Book[];
  booksfree!:Book[];
  options:autor[]=[];
  filteredOptionsautor:autor[] = [];
  selectedValue: autor={
    "nombre": "",
    "apellido": "",
    "slug": ""
  };
  freeOnly=false;
constructor(private http:HttpClient,private router:Router){
this.getautor()
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
getautor(){
  this.filteredOptions=[];
  this.http.get("http://127.0.0.1:8000/authors/").subscribe(data=>{
    const autordata = Object.values(data)
    this.options=autordata;
 const filteredOptions = new Map();
 this.options.forEach(item => {
   const key = `${item.nombre}-${item.apellido}`;
   if (!filteredOptions.has(key)) {
    filteredOptions.set(key, item);
   }
  })
  this.filteredOptionsautor = Array.from(filteredOptions.values());
});
}
onFreeFilter(){
  this.freeOnly = !this.freeOnly;
  if(this.freeOnly){
    this.filteredOptions = this.books.filter(book => book.price === 0);
  }
  else{
  this.filteredOptions=this.books
  this.onAuthorFilter
  }
  
}
onAuthorFilter(event: Event) {
  const selectedAuthor = (event.target as HTMLSelectElement).value;
  console.log(selectedAuthor)
  this.filteredOptions = this.books.filter(book => book.autor === selectedAuthor);
 if(this.filteredOptions.length===0){
  Swal.fire({
    title:'Error',
    text:'No se encontraron resultados',
    icon: 'error',
  confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Reiniciar los valores del formulario
      this.filteredOptions=this.books
    }
  });
 }
}
}
