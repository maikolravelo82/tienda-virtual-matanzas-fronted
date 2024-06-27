import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PrewiewComponent } from './components/prewiew/prewiew.component';
import { FormBookComponent } from './components/form-book/form-book.component';
import { AboutComponent } from './components/about/about.component';
import { GestionarbooksComponent } from './components/gestionarbooks/gestionarbooks.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'home'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'preview',
    component:PrewiewComponent
  },
  {
    path:"form-book",
    component:FormBookComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'gestionarbooks',
    component:GestionarbooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
