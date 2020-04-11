import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import {LinePairUser, LinePairArrange} from './../model/user';
import {LinepairserviceService} from '../service/linepairservice.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {PostFileService} from '../../../app/core/shared//service/postservice.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-arrangedialog',
  templateUrl: './arrangedialog.component.html',
  styleUrls: ['./arrangedialog.component.css']
})
export class ArrangedialogComponent implements OnInit {

  Entity: LinePairUser;

  MaleGroup: LinePairUser[];

  constructor(private dialogRef: MatDialogRef<ArrangedialogComponent>,
    private service: LinepairserviceService,
    private spinner: NgxSpinnerService,
    private postservice: PostFileService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.Entity = data.entity;
      this.MaleGroup = data.malegroup;
    }

  ngOnInit() {

  }

  public Add() {

    const arrange = new LinePairArrange();
    const now = new Date;
    arrange.Date = now;

    if (isNullOrUndefined(this.Entity.Arranges)) {
      this.Entity.Arranges = [];
    }

    this.Entity.Arranges.unshift(arrange);
  }

  public Save() {

    this.spinner.show();

    this.service.updateEntity(this.Entity).subscribe(
      val => {
        alert('更新完成');
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

  public RemovePayment(i: number) {

    if (confirm('確定要刪除?')) {

      i++;

      const orginialItems = this.Entity.Arranges;
      const filterItems = orginialItems.slice(0, i - 1).concat(orginialItems.slice(i, orginialItems.length));
      this.Entity.Arranges = filterItems;

    }
  }

  public Formatdate(val: string) {
    return val.substring(0, 10);
  }

  public Cancel() {
    this.dialogRef.close(null);
  }



}
