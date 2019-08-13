import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {

  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'invalid Email Format' }
    ]};

forgotform:FormGroup;
  constructor(private build:FormBuilder) {
    this.forgotform = this.build.group({
      email:['',Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])]
    });
   }

  ngOnInit() {
  }

  get validate(){
    return this.forgotform.controls;
  }

  SubmitData(){
      this.forgotform.controls['email'].markAsTouched();
      console.log(this.forgotform.value);
  }

  inputBlur(val: any) {
    this.forgotform.controls[val].markAsUntouched();
  }

}
