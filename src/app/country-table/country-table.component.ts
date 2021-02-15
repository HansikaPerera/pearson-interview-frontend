import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";
import { DataService } from "../data.service";

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss']
})
export class CountryTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'action'];
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

  addRowData(row_obj) {
    const d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: row_obj.name
    });
    this.table.renderRows();

  }

  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.name = row_obj.name;
      }
      return true;
    });
  }

  deleteRowData(country) {

    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != country.id;
    });
    this.dataService.deleteCountry(country.id);
  }
}
