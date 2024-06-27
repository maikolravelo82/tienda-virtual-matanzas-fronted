import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
interface usuario{
    "username": String,
    "email": String,
    "password": String,
}
interface usersend{
  "username": String,
  "password": String,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  gridTemplateColumns = '45% 55%';
  showDiv3And4 = false;
  crearuser:FormGroup;
  loginuser:FormGroup;
user:usuario={
  "username": "",
    "email": "",
    "password": "",
}
  constructor(private formBuilder: FormBuilder, private http:HttpClient, private router:Router){
    this.crearuser=this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32), ]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]]
    })
    this.loginuser=this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16), Validators.pattern('^[a-zA-Z]+$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
    })
  }
  onSubmit() {
    if (this.crearuser.valid) {
     this.user= this.crearuser.value;
     const jsonData = JSON.stringify(this.user);
      // Aquí puedes procesar el formulario
      console.log(jsonData)
      this.http.post(
        "http://127.0.0.1:8000/user_reg/",
        jsonData,
        {
          headers:({
            'Content-Type': 'application/json'
          })
        }
      ).subscribe(
        data => {
          Swal.fire({
            title: 'Datos Correctos',
            text: "El usuario ha sido creado ",
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              // Reiniciar los valores del formulario
              this.movimientodrecha();
            }
          });
        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: "El usuario ya existe ",
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      );
    } else {
      // Mostrar errores de validación
      this.showValidationErrors();

    }
  }

  showValidationErrors() {
    let errorMessages:String[] = [];
    const formControls = Object.keys(this.crearuser.controls);
    formControls.forEach(field => {
      const control = this.crearuser.get(field);
      if (!control?.valid) {
        if (control?.errors) {
          if (control.errors['required']) {
            errorMessages.push(`El campo ${field} es obligatorio.`);
          } else if (control.errors['minlength']) {
            if (field === 'name') {
              errorMessages.push('El nombre debe tener al menos 8 caracteres.');
            } else if (field === 'password') {
              errorMessages.push(`La contraseña debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`);
            }
          } else if (control.errors['maxlength']) {
            errorMessages.push(`El campo ${field} debe tener como máximo ${control.errors['maxlength'].requiredLength} caracteres.`);
          } else if (control.errors['pattern']) {
            let patternErrorMessage = 'La contraseña no es lo suficientemente segura. Debe tener:';
            if (!control.value.match(/[A-Z]/)) {
              patternErrorMessage += '\n - Al menos una letra mayúscula';
            }
            if (!control.value.match(/[a-z]/)) {
              patternErrorMessage += '\n - Al menos una letra minúscula';
            }
            if (!control.value.match(/\W/)) {
              patternErrorMessage += '\n - Al menos un carácter especial';
            }
            errorMessages.push(patternErrorMessage);
          } else if (control.errors['email']) {
            errorMessages.push('El correo electrónico debe ser válido.');
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
          this.crearuser.reset();
        }
      });
    }
  }
  onSubmituser(){
    if (this.loginuser.valid) {
      this.user=this.loginuser.value;
      /*const tokenuser:usersend={
        "username":this.user.username,
        "password":this.user.password,
      };
      const tokenuserjson= JSON.stringify(tokenuser)
      this.http.post("http://127.0.0.1:8000/api-token-auth/",tokenuserjson).subscribe(data=>{
        console.log(data)
      })*/
      this.http.get("http://127.0.0.1:8000/user_reg/").subscribe(data=>{
       const datajson = JSON.stringify(data)
        console.log(data)
        const dataexist = JSON.parse(datajson);

// Comprobar si existe el nombre "Maikol"
const userExists = dataexist.some((user: { username: string }) => user.username === this.user.username);
      // Aquí puedes procesar el formulario
      if(userExists){
        Swal.fire({
          title: 'Datos Correctos!',
          text: 'El suario es correcto',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Reiniciar los valores del formulario
            this.router.navigate(['/home'])
          }
        });
      }
      else{
        Swal.fire({
          title: 'El usario no existe !',
          text: 'Si no tiene una cuenta por favor registrese  ',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Reiniciar los valores del formulario
            this.loginuser.reset();
          }
        });
      }
    })}
     else {
      // Mostrar errores de validación
      this.showValidationErrorsuser();

    }
  }
  showValidationErrorsuser(){
    let errorMessages:String[] = [];
    const formControls = Object.keys(this.loginuser.controls);
    formControls.forEach(field => {
      const control = this.loginuser.get(field);
      if (!control?.valid) {
        if (control?.errors) {
          if (control.errors['required']) {
            errorMessages.push(`El campo ${field} es obligatorio.`);
          } else if (control.errors['minlength']) {
            if (field === 'name') {
              errorMessages.push('El nombre debe tener al menos 8 caracteres.');
            } else if (field === 'password') {
              errorMessages.push(`La contraseña debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`);
            }
          } else if (control.errors['maxlength']) {
            errorMessages.push(`El campo ${field} debe tener como máximo ${control.errors['maxlength'].requiredLength} caracteres.`);
          } else if (control.errors['pattern']) {
            let patternErrorMessage = 'La contraseña no es lo suficientemente segura. Debe tener:';
            if (!control.value.match(/[A-Z]/)) {
              patternErrorMessage += '\n - Al menos una letra mayúscula';
            }
            if (!control.value.match(/[a-z]/)) {
              patternErrorMessage += '\n - Al menos una letra minúscula';
            }
            if (!control.value.match(/\W/)) {
              patternErrorMessage += '\n - Al menos un carácter especial';
            }
            errorMessages.push(patternErrorMessage);
          } 
        }
      }
    });
  
    if (errorMessages.length > 0) {
      let errorText = 'Hay los siguientes errores:\n\n';
      errorMessages.forEach(message => {
        errorText += '' + message + '\n';
      });
  
      Swal.fire({
        title: 'Error!',
        text: errorText,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Reiniciar los valores del formulario
          this.loginuser.reset();
        }
      });
    }
  }
  movimientodrecha() {
    this.showDiv3And4 = !this.showDiv3And4;
    this.gridTemplateColumns = this.gridTemplateColumns === '45% 55%' ? '55% 45%' : '45% 55%';
  }

}
