import { Component, OnInit } from '@angular/core';
// import{ListingComponent} from 'listing-angular7';
import{HttpClient} from '@angular/common/http';
import{CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit {
  token:any;

  listingarray:any =[];
  
  tablename:any ='taskmanagement';
listingarray_skip:any = ["id"];
listingarray_modify_header:any ={};
jwttoken:any;
apiurl:any = 'http://166.62.39.137:5050/';
deletesingledata:any = 'deletesingledata';
statusarray:any = [{val:0, name:'Inactive'},{val:1, name:'Active'}];
editroute="task-management/add-task/";
updateurl:any = 'addorupdatedata';

  url:any = 'http://166.62.39.137:5050/datalist';

  constructor(private http:HttpClient,private cookie:CookieService) {
    this.token = this.cookie.get('token');
    console.log('token......');
    console.log(this.token);
    this.jwttoken = this.token;

    this.getdata();
   }

  ngOnInit() {
  }

  getdata(){
    let data:any={'source':'taskmanagement','token':this.token};
    this.http.post(this.url,data).subscribe(response=>{
      let result:any = {};
      result = response;
      console.log('listing array...........');
      this.listingarray = result.res;
      console.log(this.listingarray);
    });
  }

}
