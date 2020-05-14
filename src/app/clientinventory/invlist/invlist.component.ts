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

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private service: InvserviceService, public cryptservice: CryptserviceService,
    public authservice: AuthserviceService , private router: Router, private clipboardservice: ClipboardService
    , private dialog: MatDialog) { }

  ngOnInit() {

    this.authservice.checktoken().subscribe( val =>{
      if (val === 'OK') {
        this.GetList();
      } else {
        alert('權限不足或失效 請重新登入');
        this.router.navigate(['login']);
      }
    } );

  }

  public FilterList(filter: string) {


    if (filter === '' || filter === undefined) {
        this.list = this.templist;
    } else {
      this.list = this.templist.filter(x => x.ClientId.includes(filter) || x.ClientName.includes(filter));
    }
  }

  public GetList() {
    this.spinner.show();

    this.service.currentInventoryFullList.subscribe( val => {
      if ( isNullOrUndefined(val)) {
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

  public showEntity(id: string) {

    const cryptId = this.cryptservice.encrypt(id + '|' + 'manager');
      this.sendEncodeUrl(cryptId);
  }

  public showUserEntity(id: string) {

    const cryptId = this.cryptservice.encrypt(id + '|' + 'user');
    this.sendEncodeUrl(cryptId);
  }

  private sendEncodeUrl(url: string){

    window.open('#/clientinv/888?key=' + url  , '_self');
  }

  private copyEncodeUrl(item: ClientInventory) {
    const cryptId = this.cryptservice.encrypt(item.ClientId + '|' + 'user');
    const copyurl = 'http://biotaiwan.azurewebsites.net/#/clientinv/888?key=' + cryptId;
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


  private resetMessages() {
    this.list.forEach (item => item.Message = '');
  }

}
