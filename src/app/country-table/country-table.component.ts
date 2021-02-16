import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";
import { DataService } from "../data.service";

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
export class CountryTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'capital', 'population', 'action'];
  dataSource: UsersData[];
  dataSize: number;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(public dialog: MatDialog, public dataService: DataService) {
  }

  ngOnInit() {

    this.dataService.getAllCountries().subscribe((data: any[])=>{
      this.dataSource = data;
      this.dataSize = data.length;
    });
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
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
      this.dataSource.push(data);
      this.table.renderRows();
    });
  }

  updateRowData(country) {

    this.dataService.updateCountry(country).subscribe((data: any[])=>{
      this.dataSource = this.dataSource.filter((value, key) => {
        if (value.id == country.id) {
          value.population = country.population;
          value.capital = country.capital;
        }
        return true;
      });
    });
  }

  deleteRowData(country) {

    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != country.id;
    });
    this.dataService.deleteCountry(country.id);
  }
}
