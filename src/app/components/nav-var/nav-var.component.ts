import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book, usersend } from 'src/app/interface/Interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.css']
})
export class NavVarComponent {
  usercheck!:boolean;
  ussuario!:usersend;
  usuario_inicial!:string;
  inputValue!:string;
  filteredOptions!:Book[];
  books!:Book[];
constructor(private router:Router){
  
  const userString = localStorage.getItem('user');
  if (userString) {
    this.ussuario = JSON.parse(userString) as usersend;
    this.usuario_inicial=this.ussuario.username.charAt(0).toUpperCase();
    this.usercheck = true
  } else {
    this.ussuario = {
      username: '',
      password: ''
    };
    this.usercheck =false
  }

}
loginsuperuser(){
  const userString = localStorage.getItem('user');
  if(userString){
    const userStringsuper = localStorage.getItem('superuser');
    if(userStringsuper==="true"){
      this.router.navigate(['/noticias'])
    }
    else{
      this.router.navigate(['/noticias-view'])
    }

  }
  else{
    Swal.fire({
      title: 'No estas autenticado',
      text: 'Necesitas autenticarte para acceder a los libros gratuitos ',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        /* Aqui va tu usuario y tu contraseña del super user */
          this.router.navigate(['/login'])
        // Reiniciar los valores del formulario
       
      }
    });
  }
}
logincheck(){
  console.log("bsabhds")
  const userString = localStorage.getItem('user');
  if(userString){
    const userStringsuper = localStorage.getItem('superuser');
    if(userStringsuper==="true"){
      this.router.navigate(['/gestionarbooks'])
    }
    else{
      this.router.navigate(['/biblioteca'])
    }

  }
  else{
    Swal.fire({
      title: 'No estas autenticado',
      text: 'Necesitas autenticarte para acceder a los libros gratuitos ',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        /* Aqui va tu usuario y tu contraseña del super user */
          this.router.navigate(['/login'])
        // Reiniciar los valores del formulario
       
      }
    });
  }
}
  logout(){
    localStorage.removeItem('user');
   this.router.navigate(['/login'])
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  onInputChange(event: any) {
    if(this.filteredOptions.length===0){
      this.filteredOptions=this.books
    }
        const inputValue = event.target.value.toLowerCase();
        this.filteredOptions = this.books.filter(option =>
          option.name.toLowerCase().includes(inputValue.toLowerCase())
        );
      }
}
