import { FormBuilder , FormGroup , FormControl , Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit, OnDestroy {
  private baseUrl='http://166.62.39.137:5050/';
  addUserform: FormGroup;
  addUserSubscribe: Subscription;
  allRoles : any = [];
  
 
  constructor(public http: HttpClient, public formBuilder: FormBuilder) {
    this.addUserform = this.formBuilder.group({
      username : ['',Validators.required] , 
      email : ['',Validators.required] ,
      phone : ['',Validators.required] ,
      notes : ['',Validators.required],
      roleselect : ['',Validators.required],
      designation : [''],
      password : ['',Validators.required],
  });
   }

  ngOnInit() {
    this.dropdownGo();
  }

  dropdownGo()
  {
    let data : any = { "source": "rolemanagement", "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NjU3NzAzOTcsImlhdCI6MTU2NTY4Mzk5N30.DfsRoALwFN9HEekD9voh6v8BAvUYL6wfUOZL_VRhwjQ"};
    this.http.post(this.baseUrl + 'datalist',data).subscribe((res)=>{
      console.log("res");
            let result:any;
            result = res;   
            // console.log(result.res);
            this.allRoles = (result.res);
         
           
    });
  }

  onSubmit()
  {
    if(this.addUserform.valid)
    {
    
            console.log(this.addUserform.value);
            let data : any = { "source": "usermanagement", "data": this.addUserform.value };
            this.addUserSubscribe = this.http.post(this.baseUrl + 'addorupdatedata',data).subscribe((res)=>{
            console.log("res");
            let result:any;
            result=res; alert(result.status);
        });
    }
    else
    alert('Invalid form');
  }
  ngOnDestroy() {
    this.addUserSubscribe.unsubscribe();
    }

}
