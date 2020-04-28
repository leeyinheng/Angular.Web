import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryExtend} from '../model/projectinventory';
import {InvserviceService} from '../invservice.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-extenddialog',
  templateUrl: './extenddialog.component.html',
  styleUrls: ['./extenddialog.component.css']
})
export class ExtenddialogComponent implements OnInit {

  Entity: InventoryExtend;
  List: InventoryExtend[];
  IsNew: boolean;

  MemberChange = false;

  constructor(private dialogRef: MatDialogRef<ExtenddialogComponent>,
    private service: InvserviceService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.Entity = data.entity;
    this.List = data.list;
    this.IsNew = data.isnew;
}

  ngOnInit() {
  }

  public Save() {

    if (isNullOrUndefined(this.Entity.ProductId) || this.Entity.ProductId === '') {
      alert('不能沒有產品編號');
      return;
    }

    if ( this.IsNew && this.checkduplidate(this.Entity.ProductId)) {
      alert('產品編號重複 請確認');
      return;
    }
    this.spinner.show();

    if (this.IsNew) {
      this.service.addExtendEntity(this.Entity).subscribe(
        val => {
          alert('新增完成');
          this.List.unshift(this.Entity);
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
      this.service.editExtendEntity(this.Entity).subscribe(
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
  }

  public Cancel() {
    this.dialogRef.close(null);
  }

  private checkduplidate(id: string) {
    const item = this.List.find(x => x.ProductId === id);
    if (isNullOrUndefined(item)) {
      return false;
    } else {
      return true;
    }
  }

}
