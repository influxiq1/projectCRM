import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import{HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {

  messages: any = '';
  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'invalid Email Format' }
    ]};

forgotform:FormGroup;
  constructor(private build:FormBuilder, private http:HttpClient) {
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
    let x:any;
    for(x in this.forgotform.controls){
      this.forgotform.controls[x].markAsTouched();
      // console.log(this.forgotform.value);
    }
    let link:any = 'http://166.62.39.137:5050/forgetpassword';
    let data:any = this.forgotform.value;
    if(this.forgotform.valid){
      this.http.post(link,data).subscribe(response=>{
        // console.log('res.......'+response);
        let result: any;
         result = response;
        if(result.status == 'success'){
        this.forgotform.reset();
        }
        // console.log(result.msg);
        this.messages = result.msg;
        
      })
    }
  }

  inputBlur(val: any) {
    this.forgotform.controls[val].markAsUntouched();
  }

}
