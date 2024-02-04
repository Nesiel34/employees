import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { IEmployee } from '../models/IEmployee.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit {


  constructor(private apiService:ApiService,public dialog: MatDialog){}


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  displayedColumns: string[] = ['id', 'name', 'role','department','car','age','edit'];
  dataSource = new MatTableDataSource<IEmployee>();

  ngOnInit(): void {
    this.apiService.getEmployees().subscribe(s=>{
      this.dataSource.data = s;
    })
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  calcAge(age:number){
    if(age>=18 && age<=25){
      return "18-25";
    }
    else if(age>=25 && age<=40){
      return "25-40";
    }
    else if(age>=40 && age<=60){
      return "40-60";
    }
    else if(age>=60 && age<=80){
      return "60-80";
    }
    else if(age>=80 && age<=99){
      return "80-99";
    }
    else {
      return age;
    }
  }

  addEmployee(){
    const dialogRef = this.dialog.open(UserDetailsComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let data = this.dataSource.data;
        data.push(result);
        this.dataSource.data =data;
      }
    });
  }

  edit(employee:IEmployee){
    const dialogRef = this.dialog.open(UserDetailsComponent,{data:employee});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let data = this.dataSource.data;
        let indexToUpdate  = data.findIndex(f=>f.id==result.id);
        if(indexToUpdate!=-1){
          data[indexToUpdate] = result;
        }
        this.dataSource.data = data;
      }
    });


  }


}
