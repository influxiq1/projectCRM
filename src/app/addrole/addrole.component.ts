import { Component, OnInit, OnDestroy } from '@angular/core';
import  { FormBuilder , FormControl , FormGroup , Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import{CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.css']
  
})
export class AddroleComponent implements OnInit, OnDestroy {
  public params_id: any = [];
  addroleSubscribe: Subscription;
  resultdataSubscribe: Subscription;
  isSubmitted=false;
  baseUrl='http://166.62.39.137:5050/';
  formGroup : FormGroup;

  token:any;
  constructor( private formBuilder : FormBuilder , private http : HttpClient,
     private activeroute: ActivatedRoute, public router: Router,private cookie:CookieService) {

      this.token = this.cookie.get('token');

    this.activeroute.params.subscribe(params=>{
      // console.log(params);
      this.params_id=params['id'];
      // console.log("params iddddddddd");
      // console.log(this.params_id);
    })

     this.formGroup = this.formBuilder.group({
         rolename : ['',Validators.required] , 
         roledesc : ['',Validators.required] ,
         teammembers : ['',Validators.required] ,
         status : ['1']
     });
   }

  ngOnInit() {
    if(this.params_id != null){
    let data:any = {'source':'rolemanagement','condition':{'_id':this.params_id},'token':this.token};
    let link:any = 'http://166.62.39.137:5050/datalist';
    
    this.resultdataSubscribe =  this.http.post(link,data).subscribe(Response=>{
      console.log('EDIT DATA BLOCK');
      let resultdata:any = {};
      resultdata = Response;
      console.log('resultdata.res[0]')
      console.log(resultdata.res[0])
      this.formGroup.patchValue({
        'rolename':resultdata.res[0].rolename,
        'roledesc':resultdata.res[0].roledesc,
        'teammembers': resultdata.res[0].teammembers,
        'status':resultdata.res[0].status
      });
      // console.log('resultdata.res');
      // console.log(resultdata.res);

    });
  }
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
            let data : any = { "source": "rolemanagement", "data": this.formGroup.value };
            this.addroleSubscribe = this.http.post(this.baseUrl + 'addorupdatedata',data).subscribe((res)=>{
            console.log("res");
            let result:any = {};
            result=res;
        });
        this.router.navigate(['role-management']);
        // this.router.navigate(['role-management']);
    }
  }
    // alert('Invalid form');
  

  onUpdate(){
    if(this.formGroup.valid){
    let data:any = {'source':'rolemanagement',
    'data':{
      'id':this.params_id,
      'rolename':this.formGroup.value.rolename,
      'roledesc':this.formGroup.value.roledesc,
      'teammembers':this.formGroup.value.teammembers,
      'status':this.formGroup.value.status
    }};
    // console.log(data)
    // console.log(this.formGroup.status)
    this.http.post(this.baseUrl + 'addorupdatedata',data).subscribe(response=>{
      let result: any = {};
      result = response;
      // console.log(result);
      if(result.status == 'success'){
      this.formGroup.reset();
      this.router.navigate(['/role-management']);
      }

    });
  }
  }

  ngOnDestroy() {
    // this.addroleSubscribe.unsubscribe;
    // this.resultdataSubscribe.unsubscribe;
  }

}
