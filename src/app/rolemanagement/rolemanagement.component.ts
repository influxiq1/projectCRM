import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';;

@Component({
  selector: 'app-rolemanagement',
  templateUrl: './rolemanagement.component.html',
  styleUrls: ['./rolemanagement.component.css']
})
export class RolemanagementComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  

}
