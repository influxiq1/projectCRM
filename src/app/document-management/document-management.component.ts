import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{ActivatedRoute,Router} from '@angular/router';
import{CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-document-management',
  templateUrl: './document-management.component.html',
  styleUrls: ['./document-management.component.css']
})
export class DocumentManagementComponent implements OnInit {
  link:any =  'http://166.62.39.137:5050/';
  token:any;
  constructor(private activated:ActivatedRoute, private client:HttpClient,
    private cookie:CookieService) {
      // this.cookie.getAll();
      // this.token = this.cookie.get('token');
      // console.log('cookie..........');
      // console.log(this.token);
     }

  ngOnInit() {
    this.getdata();
  }

  getdata(){
    let data:any = {'source':'documentmanagement','token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NjYwMzk1MjIsImlhdCI6MTU2NTk1MzEyMn0.PEnLm6YJDorflUIJ9z4UChceRVgPBMEJBMOrd3FYCZ8'};
    this.client.post (this.link+'datalist',data).subscribe(response=>{
      let result:any;
      result = response;
      console.log(result);
    });
  }

}
