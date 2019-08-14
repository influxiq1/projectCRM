import { FormBuilder , FormGroup , FormControl , Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import{ActivatedRoute, Router} from '@angular/router';
export interface Role{
  rolename : string;
} 

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit, OnDestroy {
  private baseUrl='http://166.62.39.137:5050/';
  
  addUserSubscribe: Subscription;
  allRoles : any = [];
  isSubmitted = false;
  filteredOptions: Observable<string[]>;

  listingarray:any =[];
  
 public param_id:any={};
 addUserform: FormGroup;
  constructor(public http: HttpClient, public formBuilder: FormBuilder,
    private activated:ActivatedRoute,private router:Router) {
    this.addUserform = this.formBuilder.group({
      username : ['',Validators.required] , 
      email : ['',Validators.required] ,
      phone : ['',Validators.required] ,
      notes : ['',Validators.required],
      roleselect : ['',Validators.required],
      designation : [''],
      password : ['',Validators.required],
  });

  this.activated.params.subscribe(paramid=>{
    this.param_id = paramid.id;
    console.log('param_id...............');
    console.log(this.param_id);
  });

   }


  ngOnInit() {
    this.dropdownGo();

    if(this.param_id !=null){
    let data:any = {'source':'usermanagement','condition':{'_id':this.param_id},'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NjU4NTcwOTAsImlhdCI6MTU2NTc3MDY5MH0.2Dru5yq91Grd8VNVZs6JSUZqJ9b4g9lWXzx3cU_EuP0'};
    this.http.post(this.baseUrl+'datalist',data).subscribe(response=>{
      let result:any = {};
      result = response;
      console.log(result.res[0]);
      this.addUserform.patchValue({
        'username':result.res[0].username,
        'email':result.res[0].email,
        'phone':result.res[0].phone,
        'notes':result.res[0].notes,
        'roleselect':result.res[0].roleselect,
        'rolese':result.res[0].roles,
        'designation':result.res[0].designation
      });
    });
  }
  }

  dropdownGo()
  {
    let data : any = { "source": "rolemanagement", "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NjU4NTcwOTAsImlhdCI6MTU2NTc3MDY5MH0.2Dru5yq91Grd8VNVZs6JSUZqJ9b4g9lWXzx3cU_EuP0"};
    this.http.post(this.baseUrl + 'datalist',data).subscribe((res)=>{
      console.log("res............");
            let result:any;
            result = res;   
            console.log(result.res);
            this.allRoles = result.res;
    });
  }

  
  get onFormValidate()
  {
    return this.addUserform.controls;
  }

  inputBlur(val: any) {
    this.addUserform.controls[val].markAsUntouched();
  }

   
  onSubmit()
  {
    this.isSubmitted = true;
    if(this.addUserform.valid)
    {
    
            console.log(this.addUserform.value);
            let data : any = { "source": "usermanagement", "data": this.addUserform.value };
            this.addUserSubscribe = this.http.post(this.baseUrl + 'addorupdatedata',data).subscribe((res)=>{
            // console.log("res");
            let result:any;
            result=res; alert(result.status);
        });
        this.addUserform.reset();
    }
    else
    alert('Invalid form');
  }
  ngOnDestroy() {
    // this.addUserSubscribe.unsubscribe();
    }

    onUpdate(){

      let data:any = {'source':'usermanagement',
      'data':{
            'id':this.param_id,
            'username':this.addUserform.value.username,
            'email':this.addUserform.value.email,
            'phone':this.addUserform.value.phone,
            'notes':this.addUserform.value.notes,
            'roles':this.addUserform.value.roles,
            'designation':this.addUserform.value.designation
      }
      };
      this.http.post(this.baseUrl+'addorupdatedata',data).subscribe(response=>{
      //  alert(response);
      let result: any = {};
      result = response;
        console.log('response');
        console.log(result.status);
        // console.log('dataaaaaa');
        // console.log(data);
      });
      this.router.navigate(['/user-management']);
    }

    

}
