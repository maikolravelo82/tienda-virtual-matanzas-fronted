import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
interface autor{
  "nombre": string,
  "apellido": string,
  "slug": string
}
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
interface token{
  token:string
}
@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css']
})
export class FormBookComponent {
  constructor( private http:HttpClient, private formbuilder:FormBuilder){
    this.filteredOptions=[];
    console.log(this.filteredOptions.length)
    this.http.get("http://127.0.0.1:8000/authors/").subscribe(data=>{
      const autordata = Object.values(data)
      this.options=autordata;
   console.log(this.options)
    });
    this.autorformulario= this.formbuilder.group({
     nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
    }),
    this.bookform=this.formbuilder.group({
      is_free:[''],
      name:['',[Validators.required]],
      autor:['',[Validators.required]],
      image:['',[Validators.required]],
      book_file:['',[Validators.required]],
      price:['',[Validators.required]]
    })
  }
  @ViewChild('buton1') buton1!: ElementRef;
  @ViewChild('buton2') buton2!: ElementRef;
  @ViewChild('buton3') buton3!: ElementRef;
  book_file:string="";
  preview_book:string="";
  currentsection=1;
 uniqueId: string = uuidv4();
  selectedFile!: File;
  selectedImg!:File;
  autorform= false;
  bookform:FormGroup;
  autorformulario:FormGroup;
  options:any[]=[];
  filteredOptions:autor[] = [];
  selectedValue: autor={
    "nombre": "",
    "apellido": "",
    "slug": ""
  };
slug:string="asdasd"
tokenuser:token={
  token:"",
}
convertirObjetoAArreglo(){

}
  autorsubmit(){
    if(this.autorformulario.valid){
      const formautordata=this.autorformulario.value
      const autorconv:autor={
        "nombre":formautordata.nombre,
        "apellido":formautordata.apellido,
        "slug":this.slug
      }
      console.log(autorconv)
     const postautor=JSON.stringify(autorconv)
     console.log(postautor)
      this.http.post("http://127.0.0.1:8000/authors/",postautor,{
        headers:({
          'Content-Type': 'application/json'
        })
      }).subscribe(data=>{
        console.log(data)
      })
    }
    else{
      this.showValidationErrorsbook()
    }
  }
  showValidationErrorsbook(){
    let errorMessages:String[] = [];
    const formControls = Object.keys(this.autorformulario.controls);
    formControls.forEach(field => {
      const control = this.autorformulario.get(field);
      if (!control?.valid) {
        if (control?.errors) {
          if (control.errors['required']) {
            errorMessages.push(`El campo ${field} es obligatorio.`);
          } else if (control.errors['minlength']) {
            if (field === 'nombre') {
              errorMessages.push('El nombre debe tener al menos 8 caracteres.');
            } else if (field === 'apellido') {
              errorMessages.push(`El apellido debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`);
            }
          } else if (control.errors['maxlength']) {
            errorMessages.push(`El campo ${field} debe tener como máximo ${control.errors['maxlength'].requiredLength} caracteres.`);
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
          this.autorformulario.reset();
        }
      });
    }
  }
  showValidationErrorformbook(){
    let errorMessages:String[] = [];
    const formControls = Object.keys(this.bookform.controls);
    formControls.forEach(field => {
      const control = this.bookform.get(field);
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
          this.autorformulario.reset();
        }
      });
    }
  }
  toggleActive() {
    this.autorform = !this.autorform;
  }
  onInputChange(event: any) {
    const inputValue = event.target.value.toLowerCase();
    console.log(inputValue)
    this.filteredOptions = this.options.filter(option =>
      option.nombre.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.apellido.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
  selectOption(option: string) {
    
    this.bookform.get('autor')?.setValue(option)
    this.filteredOptions = [];
  }
  formcontrol( x:number){
    this.currentsection=x;
    if(this.currentsection===1){
      this.buton1.nativeElement.style.zIndex=3;
      this.buton2.nativeElement.style.zIndex=2;
      this.buton3.nativeElement.style.zIndex=1;
    }
    else if(this.currentsection===2){
      this.buton1.nativeElement.style.zIndex=1;
      this.buton2.nativeElement.style.zIndex=3;
      this.buton3.nativeElement.style.zIndex=2;
    }
    else if(this.currentsection===3){
      this.buton1.nativeElement.style.zIndex=1;
      this.buton2.nativeElement.style.zIndex=2;
      this.buton3.nativeElement.style.zIndex=3;
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.submitPdf();
  }
  onFileSelectedimg(event: any) {
    this.selectedImg = event.target.files[0];
  }
  submitform(){
    if (this.bookform.valid) {
      const user = {
        "username": "totoro",
        "password": "Lol.1118"
      };
  
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
    
          // Create the book form data
          const bookprev = this.bookform.value;
          console.log(bookprev.is_free)
          if(bookprev.is_free==='Must be a valid boolean'){
            console.log("funciono")
          }
          else{
           bookprev.is_free=false
          }
          console.log(bookprev.name);
          console.log(this.selectedValue.nombre);
          const bookFormData = new FormData();
          bookFormData.append('name', bookprev.name);
          bookFormData.append('autor', bookprev.autor);
          bookFormData.append('price', bookprev.price);
          bookFormData.append('is_free', bookprev.is_free);
          bookFormData.append('book_file', this.book_file);
          bookFormData.append('preview_book', this.preview_book);
          bookFormData.append('image', this.selectedImg);
          bookFormData.append('slug', 'asdasdas');
          bookFormData.append('merchant_uuid', this.uniqueId);
    
          // Send the HTTP POST request with the headers
          this.http.post("http://127.0.0.1:8000/books/", bookFormData, httpOptions)
            .subscribe(data => {
              console.log(data);
            });
        });
    }
    else {
      this.showValidationErrorformbook();
    }
  
  }
  submitPdf(){
    /*Aqui pon el superuser manual*/
    const user = {
      "username": "totoro",
      "password": "Lol.1118"
    };
    
    let datatoken = "";
    
    // Obtener el token de autenticación
    this.http.post<any>("http://127.0.0.1:8000/api-token-auth", user)
      .subscribe(data => {
        datatoken = data.token;
        console.log(datatoken)
    
        // Configurar las opciones HTTP con el token
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': `Token ${datatoken}`,
          })
        };
    
        // Subir el archivo PDF
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
    
        this.http.post('http://127.0.0.1:8000/pdfs/', formData, httpOptions)
          .subscribe(
            (response) => {
              // Obtener la lista de archivos PDF
              console.log(response)
              this.http.get<any[]>("http://127.0.0.1:8000/pdfs/", httpOptions)
                .subscribe(data => {
                  this.book_file = data.slice(-1)[0];
                  console.log(this.book_file);
                });
    
              // Obtener la lista de previsualizaciones PDF
              this.http.get<any[]>("http://127.0.0.1:8000/preview_pdf/", httpOptions)
                .subscribe(data => {
                  this.preview_book = data.slice(-1)[0].slug;
                  console.log(this.preview_book);
                });
            },
            (error) => {
              console.error('Error uploading file:', error);
            }
          );
      });
    }    
  }

