import { Component, OnInit } from '@angular/core';
import{AdduserComponent} from '../adduser/adduser.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private add:AdduserComponent) {
    // console.log(this.add.listingarray);
   }

  ngOnInit() {
  }

}
