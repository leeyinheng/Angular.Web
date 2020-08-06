import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { InvserviceService } from '../invservice.service';
import {  ProjectImages, ClientInventoryFull, InventoryFull } from '../model/projectinventory';
import { CryptserviceService } from './../../core/shared/service/cryptservice.service';
import { AuthserviceService } from './../../core/shared/service/authservice.service';
import { Router } from '@angular/router';
import { ImageLink } from './../../core/shared/model/ImageLink';
import { UserInfo, PaymentInfo, PaymentHistory } from '../../core/shared/model/userinfo';
import * as XLSX from 'xlsx';
import { Title } from '@angular/platform-browser';
import {ProductdialogComponent} from './../productdialog/productdialog.component';
import {  MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-invshow',
  templateUrl: './invshow.component.html',
  styleUrls: ['./invshow.component.css']
})
export class InvshowComponent implements OnInit {

  public IsManager = false;

  _entity: ClientInventoryFull = new ClientInventoryFull();

  get Entity(): ClientInventoryFull {

    return this._entity;

  }

  set Entity(value: ClientInventoryFull) {


    this._entity = value;

  }

  paymentInfo: UserInfo<PaymentInfo, PaymentHistory>;

  userInvertories: InventoryFull[];

  images: ProjectImages[];

  AdImages: ImageLink[];

  AdTextLinks: ImageLink[];

  SelfFunctionMode = false;  // turn app into self input mode which does not require excel uploading data feed

  _stock_sum = 0;
  get stock_sum(): number {
    return this._stock_sum;
  }
  set stock_sum(value: number) {
    this._stock_sum = value;
  }


  _return_sum = 0;
  get return_sum(): number {
    return this._return_sum;
  }
  set return_sum(value: number) {
    this._return_sum = value;
  }

  _notreturn_sum = 0;
  get notreturn_sum(): number {
    return this._notreturn_sum;
  }
  set notreturn_sum(value: number) {
    this._notreturn_sum = value;
  }

  @ViewChild('exceltable', { static: false }) exceltable: ElementRef;

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private service: InvserviceService, public cryptservice: CryptserviceService,
    public authservice: AuthserviceService, private router: Router, private title: Title
    , private dialog: MatDialog) { }

  ngOnInit() {

    this.title.setTitle('普洱茶雲端管理系統');

    const EncryptID: string = this.route.snapshot.queryParamMap.get('key');

    const mode: string = this.route.snapshot.queryParamMap.get('mode');

    if (mode === 'self') {
      this.SelfFunctionMode = true;
    }

    const IDstring: string = this.cryptservice.decrypt(EncryptID);

    const ID = IDstring.split('|')[0];

    const role = IDstring.split('|')[1];

    switch (role) {
      case 'manager': {
        this.IsManager = true;
        this.spinner.show();
        this.authservice.checktoken().subscribe(val => {
          if (val !== 'OK') {
            alert('權限不足或失效 請重新登入');
            this.router.navigate(['login']);
          } else {

          }
        });
        break;
      }
      case 'user': {
        this.IsManager = false;
        break;
      }
      default: {
        alert('無權限進入');
        return;
      }
    }

    if (this.IsManager) {
      this.GetEntity(ID);
    } else {
      this.GetUserEntity(ID);
    }


    this.GetPaymentInfo(ID);

    this.GetProjectImages();

    this.GetAdImages();

    this.GetAdTextLinks();

  }

  public GetEntity(ID: string) {

    this.spinner.show();

    if (this.SelfFunctionMode) {

      this.service.currentInventoryFullList.subscribe(val => {
        if (val.length === 0) {
          this.service._getClientFullEntity(ID).subscribe(value => {
            this.Entity = value;
            this.FilterForUser();
            this.spinner.hide();
          },
            err => {
              alert('無此客戶或發生錯誤');
              this.spinner.hide();
            });
        } else {
          this.Entity = val.find(x => x.ClientId === ID);
          this.FilterForUser();
          this.spinner.hide();
        }
      });

    } else {

      this.service.currentInventoryFullList.subscribe(val => {
        if (val.length === 0) {
          this.service.getFullEntityById(ID, 'admin').subscribe(value => {
            this.Entity = value;
            this.FilterForUser();
            this.spinner.hide();
          },
            err => {
              alert('無此客戶或發生錯誤');
              this.spinner.hide();
            });
        } else {
          this.Entity = val.find(x => x.ClientId === ID);
          this.FilterForUser();
          this.spinner.hide();
        }
      });
    }
  }

  public GetUserEntity(Id: string) {

    this.spinner.show();

    if (this.SelfFunctionMode) {

      this.service._getClientFullEntity(Id).subscribe(val => {
        this.Entity = val;
        this.FilterForUser();
        this.spinner.hide();
      },
      err => {
        alert('Get User Client Error');
        this.spinner.hide();
      });

    } else {
      this.service.getFullEntityById(Id, 'user').subscribe(val => {
        this.Entity = val;
        this.FilterForUser();
        this.spinner.hide();
      },
      err => {
        alert('Get User Client Error');
        this.spinner.hide();
      });
    }

  }

  public GetPaymentInfo(ID: string) {

    this.service.getPaymentEntity(ID).subscribe(val => {
      this.paymentInfo = val;
    },
      err => {
        alert('Payment Info Not Found');
      });
  }

  public GetProjectImages() {

    this.service.getImages().subscribe(val => {
      this.images = val;
    },
      err => {
        alert('溫度圖error');
      });
  }

  public FilterForUser() {

    if (this.IsManager === false) {
      const templist: InventoryFull[] = [];
      this.Entity.Inventories.forEach(i => {
        if (i.NotReturn !== 0) {
          templist.push(i);
          this.stock_sum += i.Stock;
          this.return_sum += i.Return;
          this.notreturn_sum += i.NotReturn;
        }
      });
      this.userInvertories = templist;
    } else {
      this.Entity.Inventories.forEach(i => {
        if (i.NotReturn !== 0) {
          this.stock_sum += i.Stock;
          this.return_sum += i.Return;
          this.notreturn_sum += i.NotReturn;
        }
      });
    }

  }

  public resetCount() {
    this.stock_sum = 0;
    this.return_sum = 0;
    this.notreturn_sum = 0;
  }

  public GetAdImages() {
    this.service.getAdImages().subscribe(res => {

      this.AdImages = res;

    });
  }

  public GetAdTextLinks() {
    this.service.getAdTextLinks().subscribe(res => {

      this.AdTextLinks = res;

    });
  }



  public exportexcel() {

    /* table id is passed over here */
    // const element = document.getElementById('excel-table');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.exceltable.nativeElement);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.Entity.ClientName + '.xlsx');
  }

  public AddProduct() {
    const newinfo = new InventoryFull();

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      entity: newinfo,
      isnew: true,
      clientId: this.Entity.ClientId,
      clientInv: this.Entity
    };

    const dialogRef =  this.dialog.open(ProductdialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(arg => {

      this.resetCount();
      this.FilterForUser();

    } );
  }

  public DeleteProduct(item: InventoryFull) {

    if (confirm('確定刪除 產品: ' + item.ProductId)) {
      this.service._deleteFullInvEntity(this.Entity.ClientId, item.ProductId).subscribe (val => {
        alert('已刪除產品:' + item.ProductId);
        this.Entity.Inventories.forEach( (info, index) => {
          if (info.ProductId === item.ProductId) {
            this.Entity.Inventories.splice(index, 1);
            this.resetCount();
            this.FilterForUser();
          }
        });
      });
    }

  }

  public EditProduct(item: InventoryFull) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      entity: item,
      isnew: false,
      clientId: this.Entity.ClientId
    };

    const dialogRef = this.dialog.open(ProductdialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(arg => {

      this.resetCount();
      this.FilterForUser();

    } );
  }


}
