import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import{HttpClient} from '@angular/common/http';
import{ActivatedRoute,Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-adddocument',
  templateUrl: './adddocument.component.html',
  styleUrls: ['./adddocument.component.css']
})
export class AdddocumentComponent implements OnInit {

  link:any = 'http://166.62.39.137:5050/';
  param_id:any = {};
  token:any;
  documentmanagement:FormGroup;
  constructor(private build:FormBuilder, private http:HttpClient, 
    private activated:ActivatedRoute,private cookie:CookieService,private route:Router ) {
    this.documentmanagement = this.build.group({
      name:[null,Validators.required],
      drivelink:[null,Validators.required],
      priority:[]
    });

    this.token = this.cookie.get('token');

    this.activated.params.subscribe(response=>{
      let result:any;
      result=response;
      console.log(result.id);
      this.param_id = result.id;
    });

   }

  ngOnInit() {
if(this.param_id !=null){
    let data:any ={'source':'documentmanagement','condition':{'_id':this.param_id},'token':this.token};
    this.http.post(this.link+'datalist',data).subscribe(response=>{
      let result:any;
      result = response;
      console.log('data.........');
      console.log(result);
      this.documentmanagement.patchValue({
        'name':result.res[0].name,
        'drivelink':result.res[0].drivelink,
        'priority':result.res[0].priority
      });
    })
  }
  }

  get validate(){
    return this.documentmanagement.controls;
  }

  inputblur(x:any){
    for(let x in this.documentmanagement.controls){
      this.documentmanagement.controls[x].markAsUntouched();
    }
  }

  onSubmit(){
    for(let x in this.documentmanagement.controls){
      this.documentmanagement.controls[x].markAsTouched();
    }
    if(this.documentmanagement.valid){
    let data:any ={'source':'documentmanagement','data':this.documentmanagement.value};
    this.http.post(this.link+'addorupdatedata',data).subscribe(response=>{
      let result:any = {};
      result = response;
      console.log(result);
      // this.documentmanagement.reset();
      this.route.navigate(['document-management']);
    });
  }
}

  onUpdate(){
    let data:any = {'source':'documentmanagement','token':this.token,
      'data':{
        'id':this.param_id,
        'name':this.documentmanagement.value.name,
        'drivelink':this.documentmanagement.value.drivelink,
        'priority':this.documentmanagement.value.priority
      }  
  };
    this.http.post(this.link+'addorupdatedata',data).subscribe(response=>{
      let result:any;
      result = response;
      console.log(result);
      this.documentmanagement.reset();
      this.route.navigate(['document-management']);
    })
  }

}
