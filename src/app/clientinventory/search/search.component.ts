import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import {InvserviceService} from '../invservice.service';
import {  ClientInventoryFull} from '../model/projectinventory';
import {CryptserviceService} from './../../core/shared/service/cryptservice.service';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchlist: ClientInventoryFull[];

  showtotal = 0;

  showtotalstock = 0;

  showsubtotal = 0;

  showstock = 0;

  showreturn = 0;

  _search: string;

   get Search(): string {

       return this._search;
   }

   set Search(value: string) {

       this._search = value;

       this.FilterList(value);
   }

   _search2: string;

   get Search2(): string {

       return this._search2;
   }

   set Search2(value: string) {

       this._search2 = value;

       this.FilterList2(value);
   }

templist: ClientInventoryFull[];

orginiallist: ClientInventoryFull[];

templist2: ClientInventoryFull[];


constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,
  private service: InvserviceService, public cryptservice: CryptserviceService,
  public authservice: AuthserviceService , private router: Router) { }

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

  public FilterList(filter: string) {

    this.showtotal = 0;
    this.showtotalstock = 0;

    if (filter === '' || filter === undefined) {
        this.searchlist = [];
    } else {

      this.templist = [];

      this.templist2 = this.orginiallist.filter( x => {
        if ( x.Inventories.filter( i => {
          if ((i.ProductId.includes(filter) || i.ProductName.includes(filter)) && i.NotReturn > 0) {
            return i;
          }
        }).length > 0) { return x; }
      });

        this.templist2.forEach( x => {
          const info = new ClientInventoryFull();
          info.ClientId = x.ClientId;
          info.ClientName = x.ClientName;
          info.Inventories = x.Inventories.filter( i => (i.ProductId.includes(filter)
          || i.ProductName.includes(filter)) && i.NotReturn > 0);
          this.showtotal += info.Inventories.length;
          info.Inventories.forEach( s => {
              this.showtotalstock += s.NotReturn;
              this.showsubtotal += s.NotReturn;
              this.showstock += s.Stock;
              this.showreturn += s.Return;
          });
          info.SubTotal = this.showsubtotal;
          info.SubStock = this.showstock;
          info.SubReturn = this.showreturn;
          this.templist.push(info);
          this.showsubtotal = 0;
          this.showstock = 0;
          this.showreturn = 0;
        });


      this.searchlist = this.templist;

    }
  }

  public FilterList2(filter: string) {   // 產品大類

    this.showtotal = 0;
    this.showtotalstock = 0;

    if (filter === '' || filter === undefined) {
        this.searchlist = [];
    } else {

      this.templist = [];

      this.templist2 = this.orginiallist.filter( x => {
        if ( x.Inventories.filter( i => {
          if ((i.GroupId === filter) && i.NotReturn > 0) {
            return i;
          }
        }).length > 0) { return x; }
      });

        this.templist2.forEach( x => {
          const info = new ClientInventoryFull();
          info.ClientId = x.ClientId;
          info.ClientName = x.ClientName;
          info.Inventories = x.Inventories.filter( i => (i.GroupId === filter
          ) && i.NotReturn > 0);
          this.showtotal += info.Inventories.length;
          info.Inventories.forEach( s => {
              this.showtotalstock += s.NotReturn;
              this.showsubtotal += s.NotReturn;
              this.showstock += s.Stock;
              this.showreturn += s.Return;
          });
          info.SubTotal = this.showsubtotal;
          info.SubStock = this.showstock;
          info.SubReturn = this.showreturn;
          this.templist.push(info);
          this.showsubtotal = 0;
          this.showstock = 0;
          this.showreturn = 0;
        });


      this.searchlist = this.templist;

    }
  }

  public GetList() {
    this.spinner.show();

        this.service.currentInventoryFullList.subscribe( val => {

          if ( isNullOrUndefined(val)) {
            this.service.getClientFullInvList().subscribe(vals => {
              this.orginiallist = vals;
              this.service.changeInventoryFullList(vals);
              this.spinner.hide();
            },
            err => {
              alert('Not Found or Error');
              this.spinner.hide();
            });
          } else {
            this.orginiallist = val;
            this.spinner.hide();
          }
        });

    }

    public showUserEntity(id: string) {
      const cryptId = this.cryptservice.encrypt(id + '|' + 'user');
      this.sendEncodeUrl(cryptId);
    }

    private sendEncodeUrl(url: string){
      window.open('#/clientinv/888?key=' + url  , '_blank');
    }


}
