import { Component, OnInit, ViewChild } from '@angular/core';
import { LinePairUser, ITableFilter } from './../model/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { LinepairserviceService } from '../service/linepairservice.service';
import { BsModalRef } from 'ngx-bootstrap';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { PaymentdialogComponent } from '../paymentdialog/paymentdialog.component';
import { ArrangedialogComponent } from '../arrangedialog/arrangedialog.component';
import { ShowdialogComponent } from '../showdialog/showdialog.component';
import {ActivatedRoute} from '@angular/router';
import { PushlogdialogComponent } from '../pushlogdialog/pushlogdialog.component';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])]
})
export class ListComponent implements OnInit {

  bsModalRef: BsModalRef;

  Filter = '0';

  displayedColumns = ['Name', 'Height', 'Weight', 'SalaryRange', 'City', 'Occuptation', 'Birthday'];

  expandedElement: LinePairUser | null;

  dataSource: MatTableDataSource<LinePairUser>;

  FemaleGroup: LinePairUser[];

  MaleGroup: LinePairUser[];

  MaleNoneMemberGroup: LinePairUser[];

  _list: LinePairUser[];

  get List(): LinePairUser[] {

    return this._list;

  }

  set List(value: LinePairUser[]) {

    this._list = value;

  }

  constructor(private service: LinepairserviceService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private authservice: AuthserviceService,
    private router: Router
    ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit() {

    this.authservice.checktoken().subscribe( val => {
      if (val === 'OK') {
        this.GetList();
      } else {
        alert('權限不足或失效 請重新登入');
        this.router.navigate(['linepairlogin']);
      }
    } );

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
        const orginialItems = this.List;
        this.MaleGroup = orginialItems.filter(x =>
          x.Gender === '男性' && x.Membership > 0
        );

        this.FemaleGroup = orginialItems.filter(x =>
          x.Gender === '女性'
        );

        this.MaleNoneMemberGroup = orginialItems.filter(x =>
          x.Gender === '男性' && x.Membership === 0
        );

        this.spinner.hide();
      }
    );

  }

  customFilterPredicate(data: any, filters: ITableFilter[]): boolean {
    for (let i = 0; i < filters.length; i++) {
      const fitsThisFilter = data[filters[i].column].includes(filters[i].value);
      if (!fitsThisFilter) {
        return false;
      }
    }
    return true;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  refreshpage () {
    window.location.reload();
  }


  FilterChange() {

    if (this.Filter === '1') {
     // this.dataSource.filter = '男性';
      this.dataSource = new MatTableDataSource<LinePairUser>(this.MaleGroup);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

    if (this.Filter === '2') {
     //  this.dataSource.filter = '女性';
     this.dataSource = new MatTableDataSource<LinePairUser>(this.FemaleGroup);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
    }

    if (this.Filter === '3') {
      //  this.dataSource.filter = '非會員';
      this.dataSource = new MatTableDataSource<LinePairUser>(this.MaleNoneMemberGroup);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
     }

    if (this.Filter === '0') {
     // this.dataSource.filter = '';
     this.dataSource = new MatTableDataSource<LinePairUser>(this.List);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
    }

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

    dialogConfig.data = value;

    this.dialog.open(EditDialogComponent, dialogConfig);
  }

  public EditPayment(value: LinePairUser) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';

    dialogConfig.data = {
      entity: value,
      malegroup: this.MaleGroup,
      femalegroup: this.FemaleGroup
    };

    this.dialog.open(PaymentdialogComponent, dialogConfig);
  }


  public EditArrange(value: LinePairUser) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';

    dialogConfig.data = {
      entity: value,
      malegroup: this.MaleGroup,
    };

    this.dialog.open(ArrangedialogComponent, dialogConfig);
  }

  public EditPushLog(value: LinePairUser) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';

    dialogConfig.data = {
      entity: value,
      malegroup: this.MaleGroup,
      femalegroup: this.FemaleGroup
    };

    this.dialog.open(PushlogdialogComponent, dialogConfig);
  }


  public Show(value: LinePairUser) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';

    dialogConfig.data = {
      entity: value
    };

    this.dialog.open(ShowdialogComponent, dialogConfig);
  }

  public Delete(value: LinePairUser) {

    const name = value.Name;

    if (confirm('確定要刪除' + name + '?')) {

      this.spinner.show();

      this.service.deleteEntity(value.Id).subscribe(
        rep => {
          alert('已刪除' + name);
          this.List.forEach((item, index) => {
            if (item.Id === value.Id) {
              this.List.splice(index, 1);
              this.dataSource = new MatTableDataSource<LinePairUser>(this.List);
            }
          });

          this.spinner.hide();
        },
        err => {
          alert('發生錯誤' + err);
          this.spinner.hide();
        }
      );
    }

  }

  public SalaryTerm(range: number) {
    switch (range) {
      case 1: {
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
        return '十萬到二十萬';
        break;
      }
      case 5: {
        return '二十萬以上';
        break;
      }
      default: {
        return '無資料';
        break;
      }
    }
  }


}
