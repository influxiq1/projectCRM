import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rolemanagement',
  templateUrl: './rolemanagement.component.html',
  styleUrls: ['./rolemanagement.component.css']
})
export class RolemanagementComponent implements OnInit {
  baseUrl = 'http://166.62.39.137:5050/';
  allData : any = [];
  constructor(private router : Router , private http : HttpClient) { }

  ngOnInit() {
    this.onPopulate();
  }

  onPopulate()
  {
          let data : any = {'source' : 'rolemanagement' , 'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NjU3NzAzOTcsImlhdCI6MTU2NTY4Mzk5N30.DfsRoALwFN9HEekD9voh6v8BAvUYL6wfUOZL_VRhwjQ'};
          this.http.post(this.baseUrl+'datalist',data).subscribe((res)=>{
            this.allData = res;      
            console.log(this.allData);
          });
  }

}
