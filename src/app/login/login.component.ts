import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'invalid Email Format' }
    ]}
   
loginform:FormGroup;
constructor(public build:FormBuilder){
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
      // console.log(this.loginform.controls[x].value);
    }
    console.log(this.loginform.value);

  }

  inputBlur(val: any) {
    this.loginform.controls[val].markAsUntouched();
  }
}
