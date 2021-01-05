import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './_sharedcomponents/nav/nav.component';
import { HomeComponent } from './home/home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BlogComponent } from './blog/blog.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialsModule } from './_modules/materials/materials.module';
import { TestErrorsComponent } from './_sharedcomponents/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './_sharedcomponents/not-found/not-found.component';
import { ServerErrorComponent } from './_sharedcomponents/server-error/server-error.component';
import { CookieBannerComponent } from './_sharedcomponents/cookie-banner/cookie-banner.component';
import { PrivacyStatementComponent } from './privacy-statement/privacy-statement.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    BlogComponent,
    SigninComponent,
    AboutComponent,
    RegisterComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    CookieBannerComponent,
    PrivacyStatementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
