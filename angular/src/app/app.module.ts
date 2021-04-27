import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import {  RecaptchaModule,
          RECAPTCHA_SETTINGS,
          RecaptchaSettings,
          RecaptchaFormsModule } from 'ng-recaptcha';

import { UserService} from '@app/services/user.service';

import { JwtInterceptor } from './helpers/jwt.interceptor';

import { HomeComponent } from './home/home.component';
import { EditComponent } from './admin/edit.component';
import { AddComponent } from './admin/add.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';



@NgModule({
  imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      appRoutingModule,
      FormsModule,
      RecaptchaModule,
      RecaptchaFormsModule
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      AdminComponent,
      LoginComponent,
      EditComponent,
      AddComponent,
      RegisterComponent
  ],
    bootstrap:    [ AppComponent ],
    providers: [
          { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
          UserService,
          {
            provide: RECAPTCHA_SETTINGS,
            useValue: {
              siteKey: '6Ldk5-gZAAAAAOV2tXhK-JWR4HYZyTEQdILdYA5J',
            } as RecaptchaSettings,
          }]
})
export class AppModule { }
