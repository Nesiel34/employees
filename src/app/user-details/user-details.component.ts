import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { IEmployee } from '../models/IEmployee.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {


  userForm!:FormGroup;
  roles:{role:string}[] =[];
  departments:{department:string}[]=[];

  constructor(private apiService:ApiService,   @Inject(MAT_DIALOG_DATA) public employee: IEmployee,
  public dialogRef: MatDialogRef<UserDetailsComponent>,
  ){}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id:new FormControl(),
      firstName: new FormControl('',[Validators.required,Validators.pattern('[א-ת ]*')]),
      lastName: new FormControl('',[Validators.required,Validators.pattern('[א-ת ]*')]),
      role:new FormControl('',Validators.required),
      department:new FormControl('',Validators.required),
      car:new FormControl(),
      age:new FormControl(null,[Validators.required,Validators.min(18),Validators.max(99),Validators.pattern('[0-9]*')])
    });
    if(this.employee){
      this.userForm.controls["id"].setValue(this.employee.id);
      this.userForm.controls["firstName"].setValue(this.employee.firstName);
      this.userForm.controls["lastName"].setValue(this.employee.lastName);
      this.userForm.controls["role"].setValue(this.employee.role);
      this.userForm.controls["department"].setValue(this.employee.department);
      this.userForm.controls["car"].setValue(this.employee.car);
      this.userForm.controls["age"].setValue(this.employee.age);

    }
    this.apiService.getDepartments().subscribe(s=>{
      this.departments = s;
    });
    this.apiService.getRoles().subscribe(s=>{
      this.roles = s;
    });
  }

  save(){
    // this.loginForm.markAllAsTouched();
    if(this.userForm.valid){


      if(this.employee){
        this.apiService.updateEmployee(this.userForm.value).subscribe(()=>{
          this.dialogRef.close(this.userForm.value);
        });
      }
      else {
        this.apiService.getEmployees().subscribe(s=>{
          let maxId = Math.max(...s.map(m=>{
            if(m.id){
              return +m.id;
            }
            else {
              return 0;
            }
          }));
          console.log(maxId);
          this.userForm.controls["id"].setValue(++maxId);
          this.apiService.addEmployee(this.userForm.value).subscribe(()=>{
            this.dialogRef.close(this.userForm.value);
          });
        });
      }
    }
  }

  close(){
    this.dialogRef.close(null);
  }

}
