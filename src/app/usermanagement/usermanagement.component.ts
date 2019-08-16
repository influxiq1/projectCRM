import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
listingarray:any = [];

tablename:any= 'usermanagement';
apiurl:any= 'http://166.62.39.137:5050/';
jwttoken:any='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NjYwMTY1MDEsImlhdCI6MTU2NTkzMDEwMX0.1y1mpkA8-xMBxY50DruEaJhdqepV5CZ9lFV8m3aVfGg';
deletesingledata:any='deletesingledata';
listingarray_skip:any=["_id","password"];
listingarray_modify_header:any={};
statusarray:any=[{'val':0,'name':'Inactive'},{'val':1,'name':'Active'}];
updateendpoint:any="addorupdatedata";
editroute:any="user-management/add-user/";


  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
      
    let data:any = {'source':'usermanagement',
    'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NjYwMTY1MDEsImlhdCI6MTU2NTkzMDEwMX0.1y1mpkA8-xMBxY50DruEaJhdqepV5CZ9lFV8m3aVfGg'};
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
