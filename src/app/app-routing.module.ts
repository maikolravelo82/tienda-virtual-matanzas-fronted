import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PrewiewComponent } from './components/prewiew/prewiew.component';
import { FormBookComponent } from './components/form-book/form-book.component';
import { AboutComponent } from './components/about/about.component';
import { GestionarbooksComponent } from './components/gestionarbooks/gestionarbooks.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiaFormComponent } from './components/noticia-form/noticia-form.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { NoticiasViewComponent } from './components/noticias-view/noticias-view.component';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';

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
  },
  {
    path:'noticias',
    component:NoticiasComponent
  },
  {
    path:'noticia-form',
    component:NoticiaFormComponent
  },
  {
    path:'biblioteca',
    component:BibliotecaComponent
  },
  {
    path:'contactanos',
    component:ContactanosComponent
  },
  {
    path:'noticias-view',
    component:NoticiasViewComponent
  },
  {
    path:'example',
    component:ExamplePdfViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
