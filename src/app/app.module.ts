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
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ForgotpassComponent } from './forgotpass/forgotpass.component'
import { SingupComponent } from './singup/singup.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { ProjectmanagementComponent } from './projectmanagement/projectmanagement.component';
import { RolemanagementComponent } from './rolemanagement/rolemanagement.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    ContactusComponent,
    LoginComponent,
    ForgotpassComponent,
    SingupComponent,
    UsermanagementComponent,
    ProjectmanagementComponent,
    RolemanagementComponent
  ],
  imports: [
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,MetaModule.forRoot(), BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
