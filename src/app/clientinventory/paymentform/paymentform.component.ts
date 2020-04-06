import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { UserInfo, PaymentInfo , PaymentHistory } from '../../core/shared/model/userinfo';
import { InvserviceService} from './../invservice.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-paymentform',
  templateUrl: './paymentform.component.html',
  styleUrls: ['./paymentform.component.css'],
  animations: [
    trigger('changeValue', [
      state('initial', style({
        backgroundColor: 'white',
      })),
      state('final', style({
        backgroundColor: 'yellow',
      })),
      transition('initial=>final', animate('1500ms')),
      transition('final=>initial', animate('1000ms'))
    ]),
  ]
})
export class PaymentformComponent implements OnInit {

  refresh = false;

  change = false;

  model: NgbDate;

  _model2: NgbDate;

  get model2(): NgbDate {
    return this._model2;
  }

  set model2(value: NgbDate) {
    this._model2 = value;
  }

  _list: UserInfo<PaymentInfo, PaymentHistory>[] = [];

  get List(): UserInfo<PaymentInfo, PaymentHistory>[] {

    return this._list;

  }

  set List(value: UserInfo<PaymentInfo, PaymentHistory>[]) {


    this._list = value;

  }

  currentState = 'initial';

  _entity: UserInfo<PaymentInfo, PaymentHistory> = new UserInfo<PaymentInfo, PaymentHistory>();

  get Entity(): UserInfo<PaymentInfo, PaymentHistory> {

    return this._entity;

  }

  set Entity(value: UserInfo<PaymentInfo, PaymentHistory>) {


    this._entity = value;

  }


  constructor(private service: InvserviceService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute,  public authservice: AuthserviceService, private router: Router) { }

  ngOnInit() {
    this.authservice.checktoken().subscribe( val => {
      if (val === 'OK') {
        this.getEntity();
      } else {
        alert('權限不足或失效 請重新登入');
        this.router.navigate(['login']);
      }
    } );

  }

  public getEntity() {

    this.spinner.show();

    const ID: string = this.route.snapshot.paramMap.get('id');

    if (!isNullOrUndefined(ID)) {

     this.service.currentPaymentInfo.subscribe( val => {
       this.Entity = val;
       this.spinner.hide();
     });


    }
    }

  public addnewhistory() {

    const newEntity = new PaymentHistory();

    const now = new Date;

    newEntity.Date = now.toLocaleString();

    this.Entity.InfoHistory.unshift(newEntity);

    this.change = true;
  }

  public delete(i: number) {

    this.refresh = true;

    i++;

    const orginialItems = this.Entity.InfoHistory;
    const filterItems = orginialItems.slice(0, i - 1).concat(orginialItems.slice(i, orginialItems.length));
    this.Entity.InfoHistory = filterItems;

    this.change = true;

  }

  public save() {

    this.spinner.show();

    this.service.postPaymentEntity(this.Entity).subscribe(x => {
      alert('更新完成');
      this.refresh = false;
      this.spinner.hide();
      this.change = false;
    },
      err => {
        alert('Error');
        this.spinner.hide();
      });


  }



  selectlastspaymentday (entity: NgbDate) {

   const entitystring = entity.year + '/' + entity.month + '/' + entity.day;

   this.Entity.Info.LastPaymentDate = entitystring;

   const jsDate = new Date(entity.year, entity.month - 1 , entity.day);

   const addmonth = ( +jsDate.getMonth()  +  +this.Entity.Info.PaymentPeriod);

   const nextpaymentdate = new Date(jsDate.setMonth(addmonth));

   this.model2 = new NgbDate(nextpaymentdate.getFullYear(), nextpaymentdate.getMonth() + 1 , nextpaymentdate.getDate());

   this.selectnextpaymentday(this.model2);

   this.changeState();
  }

  selectnextpaymentday(entity: NgbDate) {

    const entitystring = entity.year + '/' + entity.month + '/' + entity.day;

    this.Entity.Info.NextPaymentDate = entitystring;

  }

  resetdates() {
    this.Entity.Info.NextPaymentDate = '';
    this.Entity.Info.LastPaymentDate = '';
    this.change = true;
  }

  updatepaymentdate() {

    if (!isNullOrUndefined(this.model)) {

      this.selectlastspaymentday(this.model);
    }
  }

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

}
