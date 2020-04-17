import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import {InvserviceService} from '../invservice.service';
import {Inventory, ClientInventory, ProjectImages} from '../model/projectinventory';
import {CryptserviceService} from './../../core/shared/service/cryptservice.service';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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

templist2: ClientInventory[];


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


    if (filter === '' || filter === undefined) {
        this.list = null;
    } else {

      this.templist2 = this.templist.filter( x => {
        if ( x.Inventories.filter( i => {
          if ((i.ProductId.includes(filter) || i.ProductName.includes(filter)) && i.NotReturn > 0) {
            return i;
          }
        }).length > 0) { return x; }
      });

       this.templist2.forEach( x => {
         x.Inventories = x.Inventories.filter( i => (i.ProductId.includes(filter) || i.ProductName.includes(filter)) && i.NotReturn > 0);
      });

      this.list = this.templist2;

    }
  }

  public GetList() {
    this.spinner.show();

    this.service.currentMessage.subscribe( val => {
      if ( val.length === 0) {
        this.service.getList().subscribe(vals => {
         // this.list = vals;
          this.service.changeMessage(vals);
          this.templist = vals;
          this.spinner.hide();
        },
        err => {
          alert('Not Found or Error');
          this.spinner.hide();
        });
      } else {
        // this.list = val;
        this.templist = val;
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
