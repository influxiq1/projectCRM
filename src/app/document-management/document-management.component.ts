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
  public alldata:any=[];
  tablename:any = 'documentmanagement';
  alldata_skip:any = ["_id"];
  alldata_modify_header = {};
  deleteendpoint:any = 'deletesingledata';
  editurl:any = 'document-management/add-document/';
  updateurl:any = 'addorupdatedata';


jwttoken:any;



  link:any =  'http://166.62.39.137:5050/';
  token:any;
  constructor(private activated:ActivatedRoute, private client:HttpClient,
    private cookie:CookieService) {
      // this.cookie.getAll();
      this.token = this.cookie.get('token');
      console.log('cookie..........');
      console.log(this.token);
      this.jwttoken  = this.token;
     }

  ngOnInit() {
    this.getdata();
  }

  getdata(){
    let data:any = {'source':'documentmanagement','token':this.token};
    this.client.post (this.link+'datalist',data).subscribe(response=>{
      let result:any;
      result = response;
      this.alldata = result.res;
      console.log(this.alldata);
    });
  }

}
