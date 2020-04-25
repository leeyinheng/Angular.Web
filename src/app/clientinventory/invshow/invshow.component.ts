import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { InvserviceService } from '../invservice.service';
import { Inventory, ClientInventory, ProjectImages, InventoryExtend } from '../model/projectinventory';
import { CryptserviceService } from './../../core/shared/service/cryptservice.service';
import { AuthserviceService } from './../../core/shared/service/authservice.service';
import { Router } from '@angular/router';
import { ImageLink } from './../../core/shared/model/ImageLink';
import { UserInfo, PaymentInfo, PaymentHistory } from '../../core/shared/model/userinfo';
import * as XLSX from 'xlsx';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-invshow',
  templateUrl: './invshow.component.html',
  styleUrls: ['./invshow.component.css']
})
export class InvshowComponent implements OnInit {

  public IsManager = false;

  _entity: ClientInventory = new ClientInventory();

  get Entity(): ClientInventory {

    return this._entity;

  }

  set Entity(value: ClientInventory) {


    this._entity = value;

  }

  paymentInfo: UserInfo<PaymentInfo, PaymentHistory>;

  userInvertories: Inventory[];

  images: ProjectImages[];

  AdImages: ImageLink[];

  AdTextLinks: ImageLink[];

  extendlist: InventoryExtend[];


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
    public authservice: AuthserviceService, private router: Router, private title: Title) { }

  ngOnInit() {

    this.title.setTitle('普洱茶交流協會');

    const EncryptID: string = this.route.snapshot.queryParamMap.get('key');

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
            this.GetExtendList();
          }
        })
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

    this.GetEntity(ID);

    this.GetPaymentInfo(ID);

    this.GetProjectImages();

    this.GetAdImages();

    this.GetAdTextLinks();

  }

  public GetEntity(ID: string) {

    this.spinner.show();

    this.service.currentMessage.subscribe(val => {
      if (val.length === 0) {
        this.service.getEntityById(ID).subscribe(value => {
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

  private GetExtendList() {
    this.service.currentExtendList.subscribe(val => {
      if (isNullOrUndefined(val)) {
        this.spinner.show();
        this.service.getExtendList().subscribe(lst => {
          alert(lst.length);
          this.extendlist = lst;
          this.service.changeExtendList(lst);
          this.spinner.hide();
        },
          err => {
            alert('Extended List Error');
            this.spinner.hide();
          })

      } else {
        this.extendlist = val;
        this.spinner.hide();
      }
    });
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
      const templist: Inventory[] = [];
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

  public GetExtendedVal(id: string, type: string) {

    const item = this.extendlist.filter(x => x.ProductId === id);

    if (isNullOrUndefined(item)) {
      return '';
    } else {
      switch (type) {
        case 'GroupId': return item[0].GroupId;
          break;
        case 'BarCode': return item[0].BarCode;
          break;
        case 'LocationId': return item[0].LocationId;
          break;
        default:
          return '';
      }
    }


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


}
