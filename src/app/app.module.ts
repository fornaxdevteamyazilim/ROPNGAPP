import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule, LoginFormComponent } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment.development';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  // Diğer sayfaları buraya ekleyebilirsiniz.
];
@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
     { provide: 'http://sr.yazilimocagi.net:9063', useValue: environment.authUrl  }
    ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
