import { Component, OnInit ,Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl,FormBuilder ,FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
<<<<<<< HEAD
import{ActivatedRoute,Router} from '@angular/router';
import { url } from 'inspector';
=======
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
import{ActivatedRoute,Router} from '@angular/router';

export interface ModalData {
  msg: string;
}

>>>>>>> 2bf065f68fb88227e2611f380cd130be85a81746

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
  msg: string;
  dialogRef :any;
 
  extentions : any = ['jpg','jpeg','png','mp4','wmv'];
  isSubmitted = false;
<<<<<<< HEAD

  param_id:any = {};
 
  constructor( private http : HttpClient , private formBuilder : FormBuilder ,
     private cookieService : CookieService, private activated:ActivatedRoute,
     private router:Router) {
=======
  // public dialogRef: MatDialogRef<Modal>;

  constructor( private http : HttpClient , private formBuilder : FormBuilder ,
     private cookieService : CookieService, private activated:ActivatedRoute , public mdl : MatDialog) {
   
      // this.activated.params.subscribe(par)
>>>>>>> 2bf065f68fb88227e2611f380cd130be85a81746

    this.cookieService.getAll();
     this.token = this.cookieService.get('token');
    // console.log(this.cookieService.getAll());
    // console.log(this.cookieService.get('token'));


    this.formGroup = formBuilder.group({
      taskname : [null, Validators.required],
      taskdesc : ['',Validators.required],
      status : ['in progress',Validators.required],
      exdate : ['',Validators.required],
      priority : ['low',Validators.required],
      assigned: ['',Validators.required],
      notes: ['',Validators.required],
      fileupload : ['',Validators.required]
    })
   }


   openDialog(x : any): void {
      this.dialogRef = this.mdl.open(Modal, {
      width: '150px',
      data: { msg : x }
    });

      this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



  ngOnInit() {

    this.activated.params.subscribe(params_id=>{
      let result:any = {};
      result = params_id;
      this.param_id = result.id;
      console.log('params_id/////////');
      console.log(result.id);
    });


    this.userPopulate();

    if(this.param_id !=null){
    let data:any = {'source':'taskmanagement','condition':{'_id':this.param_id},'token':this.token};
    this.http.post(this.baseUrl+'datalist',data).subscribe(response=>{
      let result:any;
      result = response;
      console.log('singleData.........');
      console.log(result.res);

      this.formGroup.patchValue({
      taskname : result.res[0].taskname,
      taskdesc : result.res[0].taskdesc,
      status : result.res[0].status,
      exdate : result.res[0].exdate,
      priority : result.res[0].priority,
      assigned: result.res[0].assigned,
      notes: result.res[0].notes
      });
    })
  }

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

<<<<<<< HEAD
  onFileSelect(event:any){
=======

  onFileSelect(event:any)
  {
    // let file = fileInput.target.files[0];
    // let fileName = file.name;
      // console.log("sdf",this.formGroup.value.fileupload);
>>>>>>> 2bf065f68fb88227e2611f380cd130be85a81746
       this.exten = this.getExten(this.formGroup.value.fileupload);
       console.log('+++++++++++++++');
        console.log(this.exten);
       console.log('+++++++++++++++');
      console.log(this.extentions.includes(this.exten[0]));
      console.log('---------------');
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
    console.log(this.formGroup.value);
    let data : any = { "source": "taskmanagement", "data": this.formGroup.value };
            console.log(data)
            this.http.post(this.baseUrl + 'addorupdatedata',data).subscribe((res)=>{
<<<<<<< HEAD
    let result:any;
    result = res;
    console.log(result);
  })
=======
            let result:any;
            result = res;
            this.openDialog(result.status);
           
            setTimeout(() => {
              this.dialogRef.close();

            }, 2000);
            
        })

       
    }
    else{
      alert('Please fill appropriately');
    }
>>>>>>> 2bf065f68fb88227e2611f380cd130be85a81746
  }

  onUpdate(){
    let data:any ={'source':'taskmanagement',
      'data':{
      'id':this.param_id,
      'taskname':this.formGroup.value.taskname ,
      'taskdesc': this.formGroup.value.taskdesc ,
      'status': this.formGroup.value.status,
      'exdate': this.formGroup.value.exdate,
      'priority': this.formGroup.value.priority,
      'assigned': this.formGroup.value.assigned,
      'notes': this.formGroup.value.notes,
      'fileupload': this.formGroup.value.fileupload 
    },
    'token':this.token
  }

  this.http.post(this.baseUrl+'addorupdatedata',data).subscribe(response=>{
    let result:any;
    result = response;
    console.log('update result.......');
    console.log(result);
    this.formGroup.reset();

    // this.router.navigate(['/task-management']);
  });
}

}

@Component({
  selector: 'modal',
  templateUrl: 'modal.html',
})
export class Modal {

  constructor(
    public dialogRef: MatDialogRef<Modal>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData ) {}

    onNoClick(): void {
    this.dialogRef.close();
  }
 
}
