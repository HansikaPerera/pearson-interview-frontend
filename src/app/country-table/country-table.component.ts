import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";
import { DataService } from "../data.service";
import { MatPaginator } from "@angular/material/paginator";

export interface UsersData {
  name: string;
  id: number;
  population: number;
  capital: string;
}

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss']
})
export class CountryTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'capital', 'population', 'action'];
  dataSource = new MatTableDataSource<UsersData>();
  isLoading = true;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public dataService: DataService) {
  }

  ngOnInit() {

    this.fetchAllCountries();
  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
  }

  fetchAllCountries() {

    this.isLoading = true;
    this.dataService.getAllCountries().subscribe((data: UsersData[])=>{
      this.isLoading = false;
      this.dataSource.data = data;
    });
  }

  openDialog(action, obj) {

    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(country) {

    this.dataService.addCountry(country).subscribe((data: UsersData)=>{
      this.fetchAllCountries();
    });
  }

  updateRowData(country) {

    this.dataService.updateCountry(country).subscribe((data: any[])=>{
      this.fetchAllCountries();
    });
  }

  deleteRowData(country) {

    this.dataService.deleteCountry(country.id).subscribe((data: any[])=>{
      this.fetchAllCountries();
    });
  }
}
