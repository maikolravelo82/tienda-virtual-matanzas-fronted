import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { token, usersend } from 'src/app/interface/Interface';
import { BookService } from 'src/app/servicios/Services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-noticia-form',
  templateUrl: './noticia-form.component.html',
  styleUrls: ['./noticia-form.component.css']
})
export class NoticiaFormComponent {
  noticiaform:FormGroup;
  constructor( private http:HttpClient, private formbuilder:FormBuilder,private servicio:BookService,private router:Router){
   
     // Convertir el objeto en un array
      this.noticiaform= this.formbuilder.group({
       titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
        texto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
        imagen: ['', [Validators.required,]],
      }),
      this.bookprev=this.noticiaform.value
    }

    selectedFile!: File;
    selectedImg!:File;
    autorform= false;
    bookprev:any;
 
  slug:string="asdasd"
  tokenuser:token={
    token:"",
  }



 
    showValidationErrornoticiaform(){
      let errorMessages:String[] = [];
      const formControls = Object.keys(this.noticiaform.controls);
      formControls.forEach(field => {
        const control = this.noticiaform.get(field);
        if (!control?.valid) {
          if (control?.errors) {
            if (control.errors['required']) {
              errorMessages.push(`El campo ${field} es obligatorio.`);
            } 
          }
        }
      });
    
      if (errorMessages.length > 0) {
        let errorText = 'Hay los siguientes errores:\n\n';
        errorMessages.forEach(message => {
          errorText += '-' + message + '\n';
        });
    
        Swal.fire({
          title: 'Error!',
          text: errorText,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Reiniciar los valores del formulario
          }
        });
      }
    }
   
    onFileSelectedimg(event: any) {
      this.selectedImg = event.target.files[0];
    }
  
    submitnoticia(){
      if (this.noticiaform.valid) {
        const ussuario = localStorage.getItem('user');
        if (ussuario !== null) {
          const user:usersend = JSON.parse(ussuario);
            console.log(user)
        // Obtener el token de autenticación
        this.http.post<any>("http://127.0.0.1:8000/api-token-auth", user)
          .subscribe(data => {
            const tokenUser = {
              token: data.token
            };
      
            // Configurar las opciones HTTP con el token
            const httpOptions = {
              headers: new HttpHeaders({
                'Authorization': `Token ${tokenUser.token}`
              })
            };
      console.log(`Token ${tokenUser.token}`)
            // Create the book form data
            const bookprev = this.noticiaform.value;
          
            const bookFormData = new FormData();
            bookFormData.append('titulo', bookprev.titulo);
            bookFormData.append('imagen', this.selectedImg);
            bookFormData.append('slug', 'asdasdas');
            bookFormData.append('texto',bookprev.texto)
      
            // Send the HTTP POST request with the headers
            this.http.post("http://127.0.0.1:8000/noticia/", bookFormData, httpOptions)
              .subscribe(data => {
                console.log(data)
                Swal.fire({
                  title: 'Datos Correctos!',
                  text: 'La noticia ha sido creado',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                }).then((result) => {
                  if (result.isConfirmed) {
                    /* Aqui va tu usuario y tu contraseña del super user */
                      this.router.navigate(['/noticias'])
                    // Reiniciar los valores del formulario
                   
                  }
                });
              });
          });
      }
    } 
      else {
        this.showValidationErrornoticiaform();
      }
    
    }
  
}
