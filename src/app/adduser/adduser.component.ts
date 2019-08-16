import { FormBuilder , FormGroup , FormControl , Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy,  ElementRef, ViewChild } from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import{ActivatedRoute,Router} from '@angular/router';
import{CookieService} from 'ngx-cookie-service';
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
 param_id:any;

 token:any;
  constructor(public http: HttpClient, public formBuilder: FormBuilder,
    private activated:ActivatedRoute,private route:Router,private cookie:CookieService) {
​
​   this.token = this.cookie.get('token');
console.log('token..............');
console.log(this.token);

    let data : any = { "source": "rolemanagement", "token" : this.token};
    this.http.post(this.baseUrl + 'datalist',data).subscribe((res)=>{
      console.log("res");
            let result:any;
            result = res;   
           
            this.allRoles = result.res;
            console.log(this.allRoles);
           
    });
​
​
    // this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => fruit ? this._filter(fruit) : this.allRoles.slice()));
    
​
    this.addUserform = this.formBuilder.group({
      username : ['',Validators.required] , 
      email : ['',Validators.required] ,
      phone : ['',Validators.required] ,
      notes : ['',Validators.required],
      designation : [''],
      password : ['',Validators.required],
      type: ['user']
  });

    this.activated.params.subscribe(param=>{
      let params_id:any;
      params_id = param;
      this.param_id = params_id.id;
      console.log('param_id');
      console.log(this.param_id)
    })

   }
​
  ngOnInit() {
    this.dropdownGo();
if(this.param_id!=null){
    let data:any = {'source':'usermanagement','condition':{'_id':this.param_id},'token':
    this.token};
  this.http.post(this.baseUrl+'datalist',data).subscribe(Response=>{
    let result:any;
    result = Response;
    console.log('result........');
    console.log(result);
    console.log('+++++++++++');
    this.addUserform.patchValue({
      'username' : result.res[0].username , 
      'email' :  result.res[0].email,
      'phone' :  result.res[0].phone,
      'notes' : result.res[0].notes,
      'designation' :result.res[0].designation 
  });
    });
  }
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
  if (value) {
    value = value.toLocaleLowerCase();
    return this.allRoles.filter((fruit: string) =>
        fruit.rolename.toLowerCase().indexOf(value) !== -1);
} else {
    return this.allRoles;
}
}
​


  dropdownGo()
  {
    let data : any = { "source": "rolemanagement", "token" : this.token};
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
    console.log('this.addUserform.value');
    console.log(this.addUserform.value);
    if(this.addUserform.valid)
    {
    
            console.log(this.addUserform.value);
            let data3 = {username:this.addUserform.controls['username'].value, email:this.addUserform.controls['email'].value, phone:this.addUserform.controls['phone'].value, notes:this.addUserform.controls['notes'].value, designation:this.addUserform.controls['designation'].value, password:this.addUserform.controls['password'].value, type: 'uesr', roles:this.fruits};
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
    // this.addUserSubscribe.unsubscribe();
    }

    onUpdate(){

      let data:any = {'source':'usermanagement',
      'data':{
        'id':this.param_id,
        'username' : this.addUserform.value.username , 
        'email' :  this.addUserform.value.email,
        'phone' :  this.addUserform.value.phone,
        'notes' : this.addUserform.value.notes,
        'designation' :this.addUserform.value.designation,
        'fruitCtrl':this.addUserform.value.fruitCtrl
      },
    'token':this.token
  };
  
    this.http.post(this.baseUrl+'addorupdatedata',data).subscribe(response=>{
      let result:any={};
      result = response;
      console.log('update........');
      console.log(result);
    });
    this.addUserform.reset();
    this.route.navigate(['/user-management']);
  }
​
}