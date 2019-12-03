import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import {InvserviceService} from '../invservice.service';
import {Inventory, ClientInventory, ProjectImages} from '../model/projectinventory';
import {CryptserviceService} from '../services/cryptservice.service';


@Component({
  selector: 'app-invshow',
  templateUrl: './invshow.component.html',
  styleUrls: ['./invshow.component.css']
})
export class InvshowComponent implements OnInit {

  public IsManager: boolean = false;

  _entity: ClientInventory = new ClientInventory();

  get Entity(): ClientInventory {

      return this._entity;

  }

  set Entity( value: ClientInventory) {


      this._entity = value;

  }

  userInvertories: Inventory[];

  images: ProjectImages[];

 

  _stock_sum: number = 0;
  get stock_sum(): number {
    return this._stock_sum;
  }
  set stock_sum(value: number){
    this._stock_sum = value;
  }

  
  _return_sum: number = 0;
  get return_sum(): number {
    return this._return_sum;
  }
  set return_sum(value: number){
    this._return_sum = value;
  }
  
  _notreturn_sum: number = 0;
  get notreturn_sum(): number {
    return this._notreturn_sum;
  }
  set notreturn_sum(value: number){
    this._notreturn_sum = value;
  }

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private service: InvserviceService, private cryptservice: CryptserviceService) { }

  ngOnInit() {

    const EncryptID: string = decodeURI(this.route.snapshot.queryParamMap.get('key'));

    const IDstring = this.cryptservice.decrypt(EncryptID);

    const ID = IDstring.split('|')[0];
    
    const role = IDstring.split('|')[1];

    switch (role){
      case 'manager' : {
        this.IsManager = true;
        break;
      }
      case 'user' : {
        this.IsManager = false;
        break;
      }
      default : {
        alert ('無權限進入');
        return;
      }
    }

    this.GetEntity(ID);

    this.GetProjectImages();

  }

  public GetEntity(ID: string) {

    this.spinner.show();

     this.service.currentMessage.subscribe( val => {
       if ( val.length === 0) {
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
        this.Entity =  val.find(x => x.ClientId === ID);
        this.FilterForUser();
        this.spinner.hide();
       }
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

    public FilterForUser(){

      if(this.IsManager == false)
      {
        let templist: Inventory[] = []; 
      
        this.Entity.Inventories.forEach(i => {
          if (i.Return !== 0){
            templist.push(i);
            this.stock_sum += i.Stock;
            this.return_sum += i.Return;
            this.notreturn_sum += i.NotReturn;
          }
        })
  
        this.userInvertories = templist;
      }

    }

}
