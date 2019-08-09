import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';


import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';

const appRoutes: Routes = [
  { path: '', component: AboutusComponent,data: {
      meta: {
          title: 'About US',
          description: 'Have you seen my rubber duckie?'
      }
  } },
  { path: 'contact',      component: ContactusComponent,
      data: {
          meta: {
              title: 'Contact Us',
              description: 'Have you seen my rubber duckie?'
          }
      }},
      {path: 'login', component:LoginComponent, data: 
      {meta:{
        title: 'Login',
        description: 'Have you seen my rubber duckie?'
      }
    }},
    {path: 'forgotpass', component:ForgotpassComponent, data: 
      {meta:{
        title: 'Forgot Password',
        description: 'Have you seen my rubber duckie?'
      }
    }}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
