import { Component, OnInit, ViewChild } from '@angular/core';
import {LinePairUser, LinePairArrange} from './../model/user';
import {NgxSpinnerService} from 'ngx-spinner';
import {LinepairserviceService} from '../service/linepairservice.service';
import { BsModalRef } from 'ngx-bootstrap';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])]
})
export class ListComponent implements OnInit {

  bsModalRef: BsModalRef;

  displayedColumns = ['Name', 'Gender', 'City', 'Phone', 'Occuptation', 'Birthday'];

  expandedElement: LinePairUser | null;

  dataSource: MatTableDataSource<LinePairUser>;

  _list: LinePairUser[];

    get List(): LinePairUser[] {

        return this._list;

    }

    set List( value: LinePairUser[]) {

        this._list = value;

    }

  constructor(private service: LinepairserviceService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog) { }

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;


  ngOnInit() {
    this.GetList();
  }

  public GetList(): void {

    this.spinner.show();

    this.service.getUserList().subscribe(
        list => {
            this.List = list;
            this.dataSource = new MatTableDataSource<LinePairUser>(list);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.spinner.hide();
        }
    );

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public HasCar(value: boolean) {
    if (value) {
      return '有車';
    } else {
      return '沒車';
    }
  }

  public HasHouse(value: boolean) {
    if (value) {
      return '有房';
    } else {
      return '沒房';
    }
  }

  public Edit(value: LinePairUser) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';

    dialogConfig.data =  value;

    this.dialog.open(EditDialogComponent, dialogConfig);
  }

 public Delete(value: LinePairUser) {

  const name = value.Name;

  if (confirm('確定要刪除' + name + '?')) {

    this.spinner.show();

    this.service.deleteEntity(value.Id).subscribe(
      rep => {
        alert('已刪除' + name);
        this.List.forEach( (item, index) => {
          if (item.Id === value.Id) {
            this.List.splice(index, 1);
            this.dataSource = new MatTableDataSource<LinePairUser>(this.List);
          }
        });

        this.spinner.hide();
      } ,
      err => {
        alert('發生錯誤' + err);
        this.spinner.hide();
      }
    );
  }

 }

  public SalaryTerm(range: number) {
    switch (range) {
      case 1 : {
        return '三萬以下';
        break;
      }
      case 2: {
        return '三萬到五萬';
        break;
      }
      case 3: {
        return '五萬到十萬';
        break;
      }
      case 4: {
        return '十萬以上';
        break;
      }
      default: {
        return '無資料';
        break;
      }
    }
  }


}
