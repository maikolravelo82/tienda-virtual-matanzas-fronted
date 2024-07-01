import { Injectable } from '@angular/core';
interface usersend{
  "username": String,
  "password": String,
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _bookSlug: string = '';
  private user!: usersend;

  setBookSlug(slug: string) {
    this._bookSlug = slug;
  }

  getBookSlug(): string {
    return this._bookSlug;
  }


  setuser(x:usersend) {
   this.user= x;
  }

  getuser(): usersend{
    return this.user;
  }
 clearLocalStorageAfterTime(timeInMinutes:number) {
    // Calcular el tiempo en milisegundos
    const timeInMs = timeInMinutes * 60 * 1000;
  
    // Establecer un temporizador para eliminar el Local Storage
    setTimeout(() => {
      localStorage.clear();
      console.log('Local Storage cleared after ' + timeInMinutes + ' minutes.');
    }, timeInMs);
  }
}