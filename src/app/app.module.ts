import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from 'src/material/material.module';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { PostComponent } from './pages/post/post.component';

import { HeaderComponent } from './components/header/header.component';
import { MainItemComponent } from './components/main-item/main-item.component';
import { LoginFormDialogComponent } from './components/dialogs/login-form-dialog/login-form-dialog.component';
import { RegistrationFormDialogComponent } from './components/dialogs/registration-form-dialog/registration-form-dialog.component';

import { AppErrors } from './app.errors';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    MainItemComponent,
    ViewPostComponent,
    PostComponent,
    LoginFormDialogComponent,
    RegistrationFormDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    FormBuilder,
    {
      provide: ErrorHandler,
      useClass: AppErrors,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
