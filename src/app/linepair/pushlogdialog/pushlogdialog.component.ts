import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import {LinePairUser, LinePairPushLog} from './../model/user';
import {LinepairserviceService} from '../service/linepairservice.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {PostFileService} from '../../../app/core/shared//service/postservice.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-pushlogdialog',
  templateUrl: './pushlogdialog.component.html',
  styleUrls: ['./pushlogdialog.component.css']
})
export class PushlogdialogComponent implements OnInit {

  Entity: LinePairUser;

  FemaleGroup: LinePairUser[];

  MaleGroup: LinePairUser[];

  constructor(private dialogRef: MatDialogRef<PushlogdialogComponent>,
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
  }

  public Add() {


    if (isNullOrUndefined(this.Entity.Pushlogs)) {
      this.Entity.Pushlogs = [];
    }

    const log = new LinePairPushLog();
    const now = new Date;
    log.Date = now;

    this.Entity.Pushlogs.unshift(log);

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

  public Removelog(i: number) {

    if (confirm('確定要刪除?')) {

      i++;

      const orginialItems = this.Entity.Pushlogs;
      const filterItems = orginialItems.slice(0, i - 1).concat(orginialItems.slice(i, orginialItems.length));
      this.Entity.Pushlogs = filterItems;

    }

  }

  public Formatdate(val: string) {
    return val.substring(0, 10);
  }

  public Cancel() {
    this.dialogRef.close(null);
  }


}
