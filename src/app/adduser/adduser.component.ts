import { FormBuilder , FormGroup , FormControl , Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy,  ElementRef, ViewChild } from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
​
​
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit, OnDestroy {
​
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('',Validators.required);
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
​
  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
​
​
  private baseUrl='http://166.62.39.137:5050/';
  addUserform: FormGroup;
  addUserSubscribe: Subscription;
  allRoles : any = [];
  isSubmitted = false;
​
 
  constructor(public http: HttpClient, public formBuilder: FormBuilder) {
​
​
    let data : any = { "source": "rolemanagement", "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NjU4NTcwOTAsImlhdCI6MTU2NTc3MDY5MH0.2Dru5yq91Grd8VNVZs6JSUZqJ9b4g9lWXzx3cU_EuP0"};
    this.http.post(this.baseUrl + 'datalist',data).subscribe((res)=>{
      console.log("res");
            let result:any;
            result = res;   
           
            this.allRoles = result.res;
            console.log(this.allRoles);
           
    });
​
​
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allRoles.slice()));
    
​
    this.addUserform = this.formBuilder.group({
      username : ['',Validators.required] , 
      email : ['',Validators.required] ,
      phone : ['',Validators.required] ,
      notes : ['',Validators.required],
      designation : [''],
      password : ['',Validators.required],
  });
   }
​
  ngOnInit() {
    // this.dropdownGo();
  }
  
 
  add(event: MatChipInputEvent): void {
    console.log('event')
    console.log(event)
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
​
      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }
​
      // Reset the input value
      if (input) {
        input.value = '';
      }
​
      this.fruitCtrl.setValue(null);
    }
  }
​
  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);
​
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
​
  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    console.log('data');
    console.log(this.fruits)
  }
​
  private _filter(value: string): string[] {
    console.log(value)
    const filterValue = value.toLocaleLowerCase();
    console.log(filterValue);
​
    // return this.allRoles.filter((movie: string) =>
    // movie.toLocaleLowerCase().indexOf(filterValue) !== -1);
​
    return this.allRoles.filter((fruit: String) => fruit.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) === 0 );
  }
​
 
​
  dropdownGo()
  {
    let data : any = { "source": "rolemanagement", "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NjU4NTcwOTAsImlhdCI6MTU2NTc3MDY5MH0.2Dru5yq91Grd8VNVZs6JSUZqJ9b4g9lWXzx3cU_EuP0"};
    this.http.post(this.baseUrl + 'datalist',data).subscribe((res)=>{
      console.log("res");
            let result:any;
            result = res;   
           
            this.allRoles = result.res;
            console.log(this.allRoles);
           
    });
  }
​
  get onFormValidate()
  {
    return this.addUserform.controls;
  }
​
  inputBlur(val: any) {
    this.addUserform.controls[val].markAsUntouched();
  }
​
​
  onSubmit()
  {
    this.isSubmitted = true;
    console.log(this.addUserform.value);
    if(this.addUserform.valid)
    {
    
            console.log(this.addUserform.value);
            let data3 = {username:this.addUserform.controls['username'].value, email:this.addUserform.controls['email'].value, phone:this.addUserform.controls['phone'].value, notes:this.addUserform.controls['notes'].value, designation:this.addUserform.controls['designation'].value, password:this.addUserform.controls['password'].value, roles:this.fruits};
            console.log('data3')
            console.log(data3)
            // let data : any = { "source": "usermanagement", "data": this.addUserform.value };
            let data : any = { "source": "usermanagement", "data": data3 };
            console.log(data)
            this.addUserSubscribe = this.http.post(this.baseUrl + 'addorupdatedata',data).subscribe((res)=>{
            console.log("res");
            let result:any;
            result=res; 
        });
    }
    else
    alert('Invalid form');
  }
  ngOnDestroy() {
    this.addUserSubscribe.unsubscribe();
    }
​
}