import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';


import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { SingupComponent } from './singup/singup.component';
import { RolemanagementComponent } from './rolemanagement/rolemanagement.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddroleComponent } from './addrole/addrole.component';
import { AdduserComponent } from './adduser/adduser.component';
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
    }},

    {path: 'signup', component:SingupComponent, data: 
    {meta:{
      title: 'Sign Up',
      description: 'Would you like to sign up?'
    }
  }},

  {path: 'rolemanagement', component:RolemanagementComponent, data: 
  {meta:{
    title: 'Role Management',
    description: 'Would you like to Role Management?'
  }
}},

{path: 'dashboard', component:DashboardComponent, data: 
{meta:{
  title: 'Role Management',
  description: 'Would you like to Role Management?'
}
}},
{path: 'addrole', component:AddroleComponent, data: 
{meta:{
  title: 'Role Management',
  description: 'Would you like to Role Management?'
}
}},
{path: 'adduser', component:AdduserComponent, data: 
{meta:{
  title: 'Role Management',
  description: 'Would you like to Role Management?'
}
}}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
