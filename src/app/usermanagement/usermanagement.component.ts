import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
listingarray:any = [];

tablename:any= 'usermanagement';
apiurl:any= 'http://166.62.39.137:5050/';
jwttoken:any;
deletesingledata:any='deletesingledata';
listingarray_skip:any=["_id","password"];
listingarray_modify_header:any={};
statusarray:any=[{'val':0,'name':'Inactive'},{'val':1,'name':'Active'}];
updateendpoint:any="addorupdatedata";
editroute:any="user-management/add-user/";

public token:any;
  constructor(private http:HttpClient, public cookie:CookieService) {
    this.token = this.cookie.get('token');
    console.log('token.........');
    console.log(this.token);
    this.jwttoken = this.token;
   }

  ngOnInit() {
    this.getData();
  }

  getData(){
      
    let data:any = {'source':'usermanagement',
    'token':this.token};
    let link:any = 'http://166.62.39.137:5050/datalist';
    this.http.post(link,data).subscribe(response=>{
      let result:any = {};
      result = response;
      console.log('getdata');
      // console.log(result);
      this.listingarray = result.res;
      console.log(this.listingarray);
    });
  }

}
