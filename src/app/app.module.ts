import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MetaModule } from '@ngx-meta/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    ContactusComponent,
<<<<<<< HEAD
    
=======
    LoginComponent
>>>>>>> 96e6d58a3f1e38b5d5a109763d62c180e85f2a7d
  ],
  imports: [
    DemoMaterialModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,MetaModule.forRoot(), BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
