import { Component, OnInit, OnDestroy } from '@angular/core';
import  { FormBuilder , FormControl , FormGroup , Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.css']
})
export class AddroleComponent implements OnInit, OnDestroy {
  addroleSubscribe: Subscription;
  isSubmitted=false;
  baseUrl='http://166.62.39.137:5050/';
  formGroup : FormGroup;
  constructor( private formBuilder : FormBuilder , private http : HttpClient) {
     this.formGroup = this.formBuilder.group({
         rolename : ['',Validators.required] , 
         roledesc : ['',Validators.required] ,
         teammembers : ['',Validators.required] ,
         status : ['1',]
     });
   }

  ngOnInit() {
  }
  
  inputBlur(val: any) {
    this.formGroup.controls[val].markAsUntouched();
  }

  get onSignUpValidate()
  {
    return this.formGroup.controls;
  }
  onSubmit()
  {
    this.isSubmitted = true;
    if(this.formGroup.valid)
    {
    
            console.log(this.formGroup.value);
            let data : any = { "source": "rolemanagement", "data": this.formGroup.value };
            this.addroleSubscribe = this.http.post(this.baseUrl + 'addorupdatedata',data).subscribe((res)=>{
            console.log("res");
            let result:any;
            result=res;            
            alert(result.status);
        });
    }
    else
    alert('Invalid form');
  }

  ngOnDestroy() {
    this.addroleSubscribe.unsubscribe();
  }

}
