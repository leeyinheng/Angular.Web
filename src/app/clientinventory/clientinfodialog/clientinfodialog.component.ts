import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClinetInfo , ClientInventory} from '../model/projectinventory';
import {InvserviceService} from '../invservice.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-clientinfodialog',
  templateUrl: './clientinfodialog.component.html',
  styleUrls: ['./clientinfodialog.component.css']
})
export class ClientInfodialogComponent implements OnInit {

  Entity: ClinetInfo;

  Orgin: ClientInventory;

  IsNew: boolean;

  MemberChange = false;

  constructor(private dialogRef: MatDialogRef<ClientInfodialogComponent>,
    private service: InvserviceService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.Entity = data.entity;
    this.IsNew = data.isnew;
    this.Orgin = data.orgin;
}

  ngOnInit() {
  }

  public Save() {

    if (isNullOrUndefined(this.Entity.ClientId) || this.Entity.ClientId === '') {
      alert('不能沒有編號');
      return;
    }

    this.spinner.show();


    if (this.IsNew) {
      this.service.addClientInfo(this.Entity).subscribe(
        val => {
          alert('新增完成 請 Refresh 頁面');
          this.spinner.hide();
          this.dialogRef.close(null);
        },
        err => {
          alert('發生錯誤 ' + err);
          this.spinner.hide();
          this.dialogRef.close(null);
        }
      );
    }  else {
      this.service.editClientInfo(this.Entity).subscribe(
        val => {
          alert('更新完成');

          this.Orgin.ClientName = this.Entity.ClientName;
          this.Orgin.Address = this.Entity.Address;
          this.Orgin.Phone = this.Entity.Phone;

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
  }

  public Cancel() {
    this.dialogRef.close(null);
  }



}
