import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import {InvserviceService} from '../invservice.service';
import { UserInfo, PaymentInfo , PaymentHistory } from '../../core/shared/model/userinfo';
import {CryptserviceService} from './../../core/shared/service/cryptservice.service';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-paymentlist',
  templateUrl: './paymentlist.component.html',
  styleUrls: ['./paymentlist.component.css']
})
export class PaymentlistComponent implements OnInit {

  _list: UserInfo<PaymentInfo, PaymentHistory>[] = [];

  get List(): UserInfo<PaymentInfo, PaymentHistory>[] {

    return this._list;

  }

  set List(value: UserInfo<PaymentInfo, PaymentHistory>[]) {


    this._list = value;

  }

  templist: UserInfo<PaymentInfo, PaymentHistory>[];

  _search: string;

  get Search(): string {

      return this._search;
  }

  set Search(value: string) {
      this._search = value;

      this.FilterList(value);
  }

  SelfFunctionMode = false;  // turn app into self input mode which does not require excel uploading data feed

  selectedVal = '';

  constructor(private service: InvserviceService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private router: Router, public authservice: AuthserviceService) { }

  ngOnInit() {

    this.authservice.checktoken().subscribe( val => {
      if (val === 'OK') {

        this.service.currentPaymentList.subscribe( val2 => {
          if ( isNullOrUndefined(val2)  || val2.length === 0) {
            this.GetList();
          } else {
            this.List = val2;
            this.templist = this.List;
            this.spinner.hide();
          }
        });
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
    }
  }


  public GetList() {
    this.spinner.show();
    this.service.getPaymentList().subscribe(val => {
      this.List = val;
      this.templist = this.List;
      this.service.changePaymentInfoList(this.List);
      this.spinner.hide();
    },
    err => {
      alert('error');
      this.spinner.hide();
    });

  }


  onValChange(value) {

    if (value === 'Self') {
      this.SelfFunctionMode = true;
    } else {
      this.SelfFunctionMode = false;
    }

    sessionStorage.setItem('mode', value);

  }

  public FilterList(filter: string) {


    if (filter === '' || filter === undefined) {
        this.List = this.templist;
    } else {
      this.List = this.templist.filter(x => x.ClientId.includes(filter) || x.ClientName.includes(filter));
    }
  }

  public showEntity(id: string) {

    this.service.changePaymentInfo(this.List.filter(x => x.ClientId === id)[0]);

    this.router.navigate(['payment', id]);
  }

  public updateUsers() {

    this.spinner.show();

    this.service.updatePaymentUsers().subscribe(
      val => {
        alert('藏家名單更新完成 請重新更新頁面');
        this.spinner.hide();
      },
      err => {
        alert('發生錯誤');
        this.spinner.hide();
      }
    );
  }

  public updateFullInvSubUsers() {

    this.spinner.show();

    this.service.updatePaymentUserFullInvSub().subscribe(
      val => {
        alert('藏家名單更新完成 請重新更新頁面');
        this.spinner.hide();
      },
      err => {
        alert('發生錯誤');
        this.spinner.hide();
      }
    );
  }


}
