import { Component, OnInit, OnDestroy } from '@angular/core';
import{FormGroup,FormBuilder,Validators,FormControl} from '@angular/forms';
import{HttpClient} from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  // public loginSubscribe: Subject<void> = new Subject();
  public loginSubscribe:Subscription;
  messages:any = '';
  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'invalid Email Format' }
    ]}

   

loginform:FormGroup;
constructor(public build:FormBuilder, private http:HttpClient){
  this.loginform = this.build.group({
    email:['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
    password:['',Validators.required]
  });

}

  ngOnInit() {
  }

  get validate(){
    return this.loginform.controls;
  }
  SubmitData(){
    let x: any;
    for( let x in this.loginform.controls){
      this.loginform.controls[x].markAsTouched();
    }
    console.log(this.loginform.value);
    if(this.loginform.valid) {
      let data: any = {};
      data = this.loginform.value;
      let link = 'http://166.62.39.137:5050/login';
     this.loginSubscribe = this.http.post(link, data).subscribe(response=>{
        let result :any = {};
        result = response;
        if(result.status == 'success'){
        this.loginform.reset();
        }
        this.messages = result.msg;
        console.log(this.messages);
      })
    }
   

  }
  ngOnDestroy() {
    this.loginSubscribe.unsubscribe();
  }

  inputBlur(val: any) {
    this.loginform.controls[val].markAsUntouched();
  }

}
