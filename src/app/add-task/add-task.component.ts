import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl,FormBuilder ,FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  
  baseUrl = 'http://166.62.39.137:5050/';
  allUsers :  any = [];
  formGroup : FormGroup;
  exten : any ;
  token : any ;
  extentions : any = ['jpg','jpeg','png','mp4','wmv'];
  isSubmitted = false;
  constructor( private http : HttpClient , private formBuilder : FormBuilder , private cookieService : CookieService) {
   
    this.cookieService.getAll();
     this.token = this.cookieService.get('token');
    // console.log(this.cookieService.getAll());
    // console.log(this.cookieService.get('token'));


    this.formGroup = formBuilder.group({
      taskname : ['', Validators.required],
      taskdesc : ['',Validators.required],
      status : ['in progress',Validators.required],
      exdate : ['',Validators.required],
      priority : ['low',Validators.required],
      assigned: ['',Validators.required],
      notes: ['',Validators.required],
      fileupload : ['',Validators.required]
    })
   }

  ngOnInit() {
    this.userPopulate();
  }
  

  userPopulate()
  {
    let data : any = { "source": "usermanagement", "token" : this.token};
    this.http.post(this.baseUrl + 'datalist',data).subscribe((res)=>{
      console.log("res");
            let result:any;
            result = res;   
            // console.log(result.res);
            this.allUsers = result.res;
            console.log("this.allUsers");
            console.log(this.allUsers);
           
    });
  }

  onFileSelect(event:any)
  {
    // let file = fileInput.target.files[0];
    // let fileName = file.name;
      // console.log("sdf",this.formGroup.value.fileupload);
       this.exten = this.getExten(this.formGroup.value.fileupload);
       
    
       console.log(this.extentions.includes(this.exten[0]));
       if(!this.extentions.includes(this.exten[0]))
       alert('File not valid');
    
  }

  getExten(fileName){
    return (fileName.lastIndexOf('.') < 1) ?   null : fileName.split('.').slice(-1);
  }

  get onSignUpValidate()
  {
    return this.formGroup.controls;
  } 

  inputBlur(val: any) {
    this.formGroup.controls[val].markAsUntouched();
  }
  onSubmit()
  {

    if(this.formGroup.valid)
    {
      let myMoment: string = moment(this.formGroup.value.exdate).format('DD/MM/YYYY'); 
      this.formGroup.value.exdate = myMoment;
      console.log(this.formGroup.value);
            let data : any = { "source": "taskmanagement", "data": this.formGroup.value };
            console.log(data)
            this.http.post(this.baseUrl + 'addorupdatedata',data).subscribe((res)=>{
            let result:any;
            result = res;
        })
    }
    else{
      alert('Please fill appropriately');
    }
  }
}
