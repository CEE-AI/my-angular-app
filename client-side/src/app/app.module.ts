import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { JwtHelperService  } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { httpInterceptorProviders } from './helper/http.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';

import { ValidateService } from './service/validate.service';
import { AuthService } from './service/auth.service';
import { FilterPipe } from './pipes/filter.pipe';
import { CartService } from './service/cart.service';
// import { AuthGuard } from './guard/auth.guard';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // CommonModule,
    NavbarComponent,
    CartComponent,
    ProfileComponent,
    DashboardComponent,
    RegisterComponent,
    ProductsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [ValidateService, AuthService, JwtHelperService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
