import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{HttpClient} from '@angular/common/http';
import{Observable} from 'rxjs';
import{CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-rolemanagement',
  templateUrl: './rolemanagement.component.html',
  styleUrls: ['./rolemanagement.component.css']
})
export class RolemanagementComponent implements OnInit {
  listingarray:any =[];

  allData : any = [];
  tablename:any ='rolemanagement';
listingarray_skip:any = ["_id","id"];
listingarray_modify_header:any ={};
jwttoken:any;
apiurl:any = 'http://166.62.39.137:5050/';
deletesingledata:any = 'deletesingledata';
statusarray:any = [{val:0, name:'Inactive'},{val:1, name:'Active'}];
editroute="role-management/add-role/";
updateurl:any = 'addorupdatedata';

token:any;
param_id:any;
  constructor(private router : Router,private http:HttpClient, private route:Router,
     private activeroute:ActivatedRoute, private cookie:CookieService) { 
   this.token = this.cookie.get('token');
   console.log('token.............');
   console.log(this.token);
   this.jwttoken = this.token;
  }

  ngOnInit() {
    this.getdata();
  }

  getdata(){
    let data:any = {'source':'rolemanagement','token':this.token};
    let link:any = 'http://166.62.39.137:5050/datalist';
    this.http.post(link,data).subscribe(response=>{
      let result:any ={};
      result = response;
      this.listingarray = result.res;
      // console.log(this.listingarray);
    })

  }
}
