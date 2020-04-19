import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import {LinePairUser, LinePairPayment} from './../model/user';
import {LinepairserviceService} from '../service/linepairservice.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {PostFileService} from '../../../app/core/shared//service/postservice.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-paymentdialog',
  templateUrl: './paymentdialog.component.html',
  styleUrls: ['./paymentdialog.component.css']
})
export class PaymentdialogComponent implements OnInit {

  Entity: LinePairUser;

  TotalAmount = 0;

  FemaleGroup: LinePairUser[];

  MaleGroup: LinePairUser[];

  constructor(private dialogRef: MatDialogRef<PaymentdialogComponent>,
    private service: LinepairserviceService,
    private spinner: NgxSpinnerService,
    private postservice: PostFileService,
    @Inject(MAT_DIALOG_DATA) data) {
     // alert(data.MaleGroup);
      this.Entity = data.entity;
      this.MaleGroup = data.malegroup;
      this.FemaleGroup = data.femalegroup;
    }

  ngOnInit() {
    if (!isNullOrUndefined(this.Entity.Payments)) {
      this.SumTotal();
    }
  }

  public Add() {

    const payment = new LinePairPayment();
    const now = new Date;
    payment.Date = now;
    payment.Amount = 0;



    if (isNullOrUndefined(this.Entity.Payments)) {
      this.Entity.Payments = [];
    }
    this.Entity.Payments.unshift(payment);


  }

  public Save() {

    this.spinner.show();

    let changeMembership = false;

    if (this.Entity.Membership === 0) {
      this.Entity.Membership = 1;
      changeMembership = true;
     }

    this.service.updateEntity(this.Entity).subscribe(
      val => {

        alert('更新完成');

        if (changeMembership) {
          alert('自動調整為會員狀態');
          window.location.reload();
        }

        this.spinner.hide();
        this.dialogRef.close(null);

      },
      err => {
        alert('發生錯誤 ' + err);
        this.spinner.hide();
        this.dialogRef.close(null);
      }
    );

  }

  public SetPayment(info: LinePairPayment) {
    const type = info.Type;
    if (type === '入會') {
      info.Amount = 2500;
    }
    if (type === '配對') {
      info.Amount = 1500;
    }

    this.SumTotal();

  }

  public RemovePayment(i: number) {

    if (confirm('確定要刪除?')) {

      i++;

      const orginialItems = this.Entity.Payments;
      const filterItems = orginialItems.slice(0, i - 1).concat(orginialItems.slice(i, orginialItems.length));
      this.Entity.Payments = filterItems;

      this.SumTotal();


    }

  }

  private SumTotal() {

    this.TotalAmount = 0;

    this.Entity.Payments.forEach( x => {
        this.TotalAmount += x.Amount;
    });
  }

  public Formatdate(val: string) {
    return val.substring(0, 10);
  }


  public Cancel() {
    this.dialogRef.close(null);
  }


}
