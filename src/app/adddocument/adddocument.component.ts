import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import{HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-adddocument',
  templateUrl: './adddocument.component.html',
  styleUrls: ['./adddocument.component.css']
})
export class AdddocumentComponent implements OnInit {

  link:any = 'http://166.62.39.137:5050/';

  documentmanagement:FormGroup;
  constructor(private build:FormBuilder, private http:HttpClient ) {
    this.documentmanagement = this.build.group({
      name:[],
      drivelink:[],
      priority:[]
    });
   }

  ngOnInit() {
  }

  onSubmit(){
    let data:any ={'source':'documentmanagement','data':this.documentmanagement.value};
    this.http.post(this.link+'addorupdatedata',data).subscribe(response=>{
      let result:any = {};
      result = response;
      console.log(result);
      this.documentmanagement.reset();
    });
  }

}
