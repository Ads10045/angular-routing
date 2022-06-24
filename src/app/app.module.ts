import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './general/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './general/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CardsComponent } from './general/card/cards.component';

import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';  
import { SidebarModule } from './components/sidebar/sidebar.module'; 
import { CardsModule } from './general/card/cards.module';
import { JwtInterceptor } from './interceptors/jwt.interceptor';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ContainerComponent } from './container.component';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    CardsComponent,
    SidebarComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    SidebarModule,
    CardsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
