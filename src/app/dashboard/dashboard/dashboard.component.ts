import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse'; 
import { DepartmentserviceService } from 'src/app/services/departmentservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  departmentlist: any;
  csvImportedData:any;

  allRecords: number = 0;
  pagination: number = 1;
  
  constructor(private papa: Papa, private deptservice:DepartmentserviceService) { }

  ngOnInit(): void {
    this.getDepartmentList();
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.parseCsv(file);
    }
  }
  parseCsv(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csv = e.target.result;
      this.papa.parse(csv, {
        complete: (result: any) => {
          // Process the parsed data (result.data) here
        this.csvImportedData = result.data;
          console.log(this.csvImportedData);
        }
      });
    };
    reader.readAsText(file);
  }

  getDepartmentList(){
    this.deptservice.getAllData(this.pagination).subscribe(((resp: any)=>{
      const rowdata = resp['data'];
      this.allRecords = resp['total'];

      this.departmentlist = rowdata['rows'];
      console.log(this.departmentlist);
    }));
  }

  renderPage(event: number) {
    this.pagination = event;
    this.getDepartmentList();
  }

  importData(){
    this.deptservice.importCsvFile(this.csvImportedData).subscribe((resp:any)=>{
      console.log();
    });
  }

}
