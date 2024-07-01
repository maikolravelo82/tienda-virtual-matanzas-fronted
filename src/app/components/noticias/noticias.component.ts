import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Noticia } from 'src/app/interface/Interface';
import { BookService } from 'src/app/servicios/Services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent {
noticias!:Noticia[];
  constructor(private router: Router,private http:HttpClient, private servicio:BookService) {
    
    this.http.get("http://127.0.0.1:8000/noticia/").subscribe(data=>{
      this.noticias = Object.values(data);
      console.log(data)
      console.log(this.noticias.length)
    })
    
  }
 

  editnoticia(x:string) {
       const url_delete=`http://127.0.0.1:8000/noticia/${x}/`
       this.http.delete(url_delete).subscribe(data=>{
        this.router.navigate(['/noticia-form'])
        console.log(data)
          })
  }

  deletenoticia(x:string) {
    const url_delete=`http://127.0.0.1:8000/noticia/${x}/`
    Swal.fire({
      title: 'Desea eliminar la noticia',
      text: "Se perderan todos los datos de la noticia",
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
