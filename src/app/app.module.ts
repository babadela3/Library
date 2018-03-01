import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditorComponent } from './components/user-editor/user-editor.component';
import { ArticleEditorComponent } from './components/article-editor/article-editor.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { RestService } from './services/rest.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleReadComponent } from './components/article-read/article-read.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ArticleListComponent,
    UserListComponent,
    UserEditorComponent,
    ArticleEditorComponent,
    NotFoundComponent,
    ArticleReadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()

  ],
  providers: [
    CookieService,
    AuthService,
    RestService],
  bootstrap: [AppComponent],
  entryComponents: [
    UserEditorComponent,
    ArticleEditorComponent]
})
export class AppModule { }
