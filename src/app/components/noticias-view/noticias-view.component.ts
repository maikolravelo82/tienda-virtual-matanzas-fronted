import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Noticia } from 'src/app/interface/Interface';
import { BookService } from 'src/app/servicios/Services';

@Component({
  selector: 'app-noticias-view',
  templateUrl: './noticias-view.component.html',
  styleUrls: ['./noticias-view.component.css']
})
export class NoticiasViewComponent {
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
    
  }
 
}
