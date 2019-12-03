import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import {InvserviceService} from '../invservice.service';
import {Inventory, ClientInventory, ProjectImages} from '../model/projectinventory';
import {CryptserviceService} from '../services/cryptservice.service';

@Component({
  selector: 'app-invlist',
  templateUrl: './invlist.component.html',
  styleUrls: ['./invlist.component.css']
})
export class InvlistComponent implements OnInit {

  list: ClientInventory[];

   _search: string;

    get Search(): string {

        return this._search;
    }

    set Search(value: string) {
        this._search = value;

        this.FilterList(value);
    }

 templist: ClientInventory[];

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private service: InvserviceService, private cryptservice : CryptserviceService) { }

  ngOnInit() {

    this.GetList();

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

    this.service.currentMessage.subscribe( val => {
      if ( val.length === 0) {
        this.service.getList().subscribe(vals => {
          this.list = vals;
          this.service.changeMessage(vals);
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

  public showUserEntity(id: string){
     
    const cryptId = this.cryptservice.encrypt(id + '|' + 'user');
    this.sendEncodeUrl(cryptId);
  }

  private sendEncodeUrl(url: string){
    const encodeurl = encodeURI(url);
    window.open('#/clientinv/888?key=' + encodeurl  , '_self');
  }

}
