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
import { AddTaskComponent } from './add-task/add-task.component';
import { ProjectmanagementComponent } from './projectmanagement/projectmanagement.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { AdddocumentComponent } from './adddocument/adddocument.component';
import { DocumentManagementComponent } from './document-management/document-management.component';
const appRoutes: Routes = [
  //************************************** */
{ path: 'aboutus', component: AboutusComponent,data: {
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
// *******************************************/
{path: '', component:LoginComponent, data: 
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
{path: 'dashboard', component:DashboardComponent, data: 
{meta:{
  title: 'Role Management',
  description: 'Would you like to Role Management?'
}
}},
//************************************** */
{path: 'role-management', component:RolemanagementComponent, data: 
  {meta:{
    title: 'Role Management',
    description: 'Would you like to Role Management?'
  }
}},
{path: 'role-management/add-role/:id', component:AddroleComponent, data: 
{meta:{
  title: 'Role Management',
  description: 'Would you like to Role Management?'
}
}},
{path: 'add-role', component:AddroleComponent, data: 
{meta:{
  title: 'Role Management',
  description: 'Would you like to Role Management?'
}
}},
//************************************ */
{path: 'project-management', component:ProjectmanagementComponent, data: 
{meta:{
  title: 'Project Management',
  description: 'Would you like to Role Management?'
}
}},
//*********************************************** */
{path: 'user-management', component:UsermanagementComponent, data: 
{meta:{
  title: 'User Management',
  description: 'Would you like to Role Management?'
}
}},
{path: 'user-management/add-user/:id', component:AdduserComponent, data: 
{meta:{
  title: 'User Management',
  description: 'Would you like to Role Management?'
}
}},
{path: 'add-user', component:AdduserComponent, data: 
{meta:{
  title: 'Role Management',
  description: 'Would you like to Role Management?'
}
}},
//******************************************** */
{path: 'task-management', component:TaskManagementComponent, data: 
{meta:{
  title: 'Task Management',
  description: 'Would you like to Role Management?'
}
}},
{path: 'task-management/add-task/:id', component:AddTaskComponent, data: 
{meta:{
  title: 'Task Management',
  description: 'Would you like to Role Management?'
}
}},
{path: 'add-task', component:AddTaskComponent, data: 
{meta:{
  title: 'Task Management',
  description: 'Would you like to Role Management?'
}
}},
//******************************************* */
{path: 'user-management', component:UsermanagementComponent, data: 
{meta:{
  title: 'User Management',
  description: 'Would you like to Role Management?'
}
}},
{path: 'user-management/add-user/:id', component:AdduserComponent, data: 
{meta:{
  title: 'User Management',
  description: 'Would you like to Role Management?'
}
}},
{path: 'add-user', component:AdduserComponent, data: 
{meta:{
  title: 'Role Management',
  description: 'Would you like to Role Management?'
}
}},
//******************************************** */
{path: 'document-management', component:DocumentManagementComponent, data: 
{meta:{
  title: 'Document Management',
  description: 'Would you like to Role Management?'
}
}},
{path: 'document-management/add-document/:id', component:AdddocumentComponent, data: 
{meta:{
  title: 'Document Management',
  description: 'Would you like to Role Management?'
}
}},
{path: 'add-document', component:AdddocumentComponent, data: 
{meta:{
  title: 'Add Document',
  description: 'Would you like to Role Management?'
}
}},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
