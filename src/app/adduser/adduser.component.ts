import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  constructor(public http: HttpClient, public formBuilder: FormBuilder) {
    this.addUserform = this.formBuilder.group({
      rolename : ['',Validators.required] , 
      roledesc : ['',Validators.required] ,
      teammembers : ['',Validators.required] ,
      status : ['1',]
  });
   }

  ngOnInit() {
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
            result=res;
            
            alert(result.status);
        });
    }
    else
    alert('Invalid form');
  }
  ngOnDestroy() {
    this.addUserSubscribe.unsubscribe();
    }

}
