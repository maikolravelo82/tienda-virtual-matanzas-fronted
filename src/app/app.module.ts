import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PrewiewComponent } from './components/prewiew/prewiew.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormBookComponent } from './components/form-book/form-book.component';
import { AboutComponent } from './components/about/about.component';
import { GestionarbooksComponent } from './components/gestionarbooks/gestionarbooks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { NavVarComponent } from './components/nav-var/nav-var.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiaFormComponent } from './components/noticia-form/noticia-form.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { NoticiasViewComponent } from './components/noticias-view/noticias-view.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PrewiewComponent,
    FormBookComponent,
    AboutComponent,
    GestionarbooksComponent,
    NavVarComponent,
    NoticiasComponent,
    NoticiaFormComponent,
    BibliotecaComponent,
    ContactanosComponent,
    NoticiasViewComponent,
    ExamplePdfViewerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgSelectModule,
    NgxExtendedPdfViewerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
