import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import {InvserviceService} from '../invservice.service';
import { InventoryExtend, ClientInventory, ClientInventoryFull} from '../model/projectinventory';
import {CryptserviceService} from './../../core/shared/service/cryptservice.service';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {Router} from '@angular/router';
import {ExtenddialogComponent} from './../extenddialog/extenddialog.component';
import {  MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-extendlist',
  templateUrl: './extendlist.component.html',
  styleUrls: ['./extendlist.component.css']
})
export class ExtendlistComponent implements OnInit {

  p = 1;

  _list: InventoryExtend[] = [];

  get List(): InventoryExtend[] {

    return this._list;

  }

  set List(value: InventoryExtend[]) {


    this._list = value;

  }

  templist: InventoryExtend[];

  _search: string;

  get Search(): string {

      return this._search;
  }

  set Search(value: string) {
      this._search = value;

      this.FilterList(value);
  }


  constructor(private service: InvserviceService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private router: Router, public authservice: AuthserviceService,
    private dialog: MatDialog) { }


  ngOnInit() {
    this.authservice.checktoken().subscribe( val => {
      if (val === 'OK') {

        this.GetList();

      } else {
        alert('權限不足或失效 請重新登入');
        this.router.navigate(['login']);
      }
    } );
  }

  private GetList() {
    this.spinner.show();
    this.service.getExtendList().subscribe(val => {
      this.List = val;
      this.templist = this.List;
      this.spinner.hide();
    },
    err => {
      alert('error');
      this.spinner.hide();
    });

  }

  public FilterList(filter: string) {


    if (filter === '' || filter === undefined) {
        this.List = this.templist;
    } else {
      this.List = this.templist.filter(x => x.ProductId.includes(filter));
    }
  }

   public delete(i: number) {


    const id = this.List[i].ProductId;

    if (confirm('確定刪除 ID: ' + id + '?')) {

      this.service.deleteExtendEntity(id).subscribe( resp => {
        alert( '刪除 產品編號:' + id);
        i++;
        const orginialItems = this.List;
        const filterItems = orginialItems.slice(0, i - 1).concat(orginialItems.slice(i, orginialItems.length));
        this.List = filterItems;
      } ,
      err => {
        alert('delete error');
      });

    }

  }

  public Edit(value: InventoryExtend) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      entity: value,
      list: this.List,
      isnew: false
    };

     this.dialog.open(ExtenddialogComponent, dialogConfig);
  }

  public AddNew() {
    const dialogConfig = new MatDialogConfig();

    const newitem = new InventoryExtend();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      entity: newitem,
      list: this.List,
      isnew: true
    };

     this.dialog.open(ExtenddialogComponent, dialogConfig);
  }

}
