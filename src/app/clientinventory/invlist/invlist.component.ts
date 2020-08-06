import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import {InvserviceService} from '../invservice.service';
import {Inventory, ClientInventory, ClientInventoryFull, ClinetInfo} from '../model/projectinventory';
import {CryptserviceService} from './../../core/shared/service/cryptservice.service';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {Router} from '@angular/router';
import { ClipboardService} from 'ngx-clipboard';
import {  MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {ClientInfodialogComponent} from './../clientinfodialog/clientinfodialog.component';



@Component({
  selector: 'app-invlist',
  templateUrl: './invlist.component.html',
  styleUrls: ['./invlist.component.css']
})
export class InvlistComponent implements OnInit {

  list: ClientInventoryFull[];

   _search: string;

    get Search(): string {

        return this._search;
    }

    set Search(value: string) {
        this._search = value;

        this.FilterList(value);
    }

 templist: ClientInventoryFull[];

 SelfFunctionMode = false;  // turn app into self input mode which does not require excel uploading data feed

 selectedVal = '';

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private service: InvserviceService, public cryptservice: CryptserviceService,
    public authservice: AuthserviceService , private router: Router, private clipboardservice: ClipboardService
    , private dialog: MatDialog) { }

  ngOnInit() {

    this.authservice.checktoken().subscribe( val => {
      if (val === 'OK') {

      } else {
        alert('權限不足或失效 請重新登入');
        this.router.navigate(['login']);
      }
    } );

    const value = sessionStorage.getItem('mode');

    if (!isNullOrUndefined(value)) {

      if (value === 'Self') {
        this.SelfFunctionMode = true;
      } else {
        this.SelfFunctionMode = false;
      }

      this.selectedVal = value;

      this.GetList(false);
    }

  }

  public FilterList(filter: string) {


    if (filter === '' || filter === undefined) {
        this.list = this.templist;
    } else {
      this.list = this.templist.filter(x => x.ClientId.includes(filter) || x.ClientName.includes(filter));
    }
  }

  onValChange(value) {

    if (value === 'Self') {
      this.SelfFunctionMode = true;
    } else {
      this.SelfFunctionMode = false;
    }

    sessionStorage.setItem('mode', value);



    this.GetList(true);

  }

  public GetList(reset: boolean) {
    this.spinner.show();

    if (this.SelfFunctionMode) {
      this.service.currentInventoryFullList.subscribe( val => {
        if ( isNullOrUndefined(val) || reset) {
          this.service._getClientFullList().subscribe(vals => {
            this.list = vals;
            this.service.changeInventoryFullList(vals);
            this.templist = this.list;
            this.spinner.hide();
          },
          err => {
            alert('Not Found or Error');
            this.spinner.hide();
          });
        } else {
          this.list = val;
          this.templist = this.list;
         this.spinner.hide();
        }
      });
    } else {
      // Excel Upload Mode
      this.service.currentInventoryFullList.subscribe( val => {
        if ( isNullOrUndefined(val) || reset) {
          this.service.getClientFullInvList().subscribe(vals => {
            this.list = vals;
            this.service.changeInventoryFullList(vals);
            this.templist = this.list;
            this.spinner.hide();
          },
          err => {
            alert('Not Found or Error');
            this.spinner.hide();
          });
        } else {
          this.list = val;
          this.templist = this.list;
         this.spinner.hide();
        }
      });

    }

    }

  public showEntity(id: string) {

    const cryptId = this.cryptservice.encrypt(id + '|' + 'manager');
      this.sendEncodeUrl(cryptId);
  }

  public showUserEntity(id: string) {

    const cryptId = this.cryptservice.encrypt(id + '|' + 'user');
    this.sendEncodeUrl(cryptId);

  }

  private sendEncodeUrl(url: string) {

    if (this.SelfFunctionMode) {
      window.open('#/clientinv/888?key=' + url + '&mode=self'  , '_self');
    } else {
      window.open('#/clientinv/888?key=' + url + '&mode=excel' , '_self');
    }

  }

  private copyEncodeUrl(item: ClientInventory) {
    const cryptId = this.cryptservice.encrypt(item.ClientId + '|' + 'user');
    let copyurl = 'http://biotaiwan.azurewebsites.net/#/clientinv/888?key=' + cryptId;
    if (this.SelfFunctionMode) {
      copyurl += '&mode=self';
    } else {
      copyurl += '&mode=excel';
    }
    this.clipboardservice.copyFromContent(copyurl);
    this.resetMessages();
    item.Message = '(已複製)';
  }

    public  EditClientInfo(value: ClientInventory) {

    const clientinfo = new ClinetInfo();
    clientinfo.ClientId = value.ClientId;
    clientinfo.ClientName = value.ClientName;
    clientinfo.Address = value.Address;
    clientinfo.Phone = value.Phone;


    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      entity: clientinfo,
      orgin: value,
      isnew: false
    };

     this.dialog.open(ClientInfodialogComponent, dialogConfig);
  }

  public  AddClientInfo() {

    const clientinfo = new ClinetInfo();

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      entity: clientinfo,
      isnew: true
    };

     this.dialog.open(ClientInfodialogComponent, dialogConfig);
  }

 public DeleteClientInfo(value: ClientInventory) {

    if (confirm('確定要刪除藏家:' + value.ClientName + '?')) {
        this.service.deleteClientInfo(value.ClientId).subscribe(val => {
            alert('已刪除藏家:' + value.ClientName);
            this.list.forEach( (info, index) => {
              if (info.ClientId === value.ClientId) {
                this.list.splice(index, 1);
              }
            });
          },
          err => {
            alert('刪除失敗!' + err);
          });
    }
 }

 public syncExcelData() {

  if (confirm('請確認要執行更新獨立資料庫資料, 原有資料可能會因同步刪除(如果不在Excel 上傳的資料裡) 過程時間會長')) {

    this.spinner.show();

    this.service._syncExcelData().subscribe(val => {
      alert('資料更新完畢');
      this.spinner.hide();
    },
    err => {
      alert('Update Error');
      this.spinner.hide();
    });


  }

 }


  private resetMessages() {
    this.list.forEach (item => item.Message = '');
  }

}
