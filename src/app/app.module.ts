import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';

import { HeaderComponent } from './components/header/header.component';
import { MainItemComponent } from './components/main-item/main-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormInputComponent } from './components/form-input/form-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    MainItemComponent,
    ModalComponent,
    FormInputComponent,
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
