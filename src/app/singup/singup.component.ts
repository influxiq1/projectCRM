import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
   role : any = ['A','B','C','D'];
  constructor() { }

  ngOnInit() {
  }

}
