import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { PostComponent } from './pages/post/post.component';

import { HeaderComponent } from './components/header/header.component';
import { MainItemComponent } from './components/main-item/main-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FloatingActionButtonComponent } from './components/floating-action-button/floating-action-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    MainItemComponent,
    ModalComponent,
    FormInputComponent,
    ViewPostComponent,
    PostComponent,
    FloatingActionButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClientModule, FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
