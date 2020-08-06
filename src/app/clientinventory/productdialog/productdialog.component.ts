import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClinetInfo , ClientInventory, InventoryFull, ClientInventoryFull} from '../model/projectinventory';
import {InvserviceService} from '../invservice.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-productdialog',
  templateUrl: './productdialog.component.html',
  styleUrls: ['./productdialog.component.css']
})
export class ProductdialogComponent implements OnInit {

  Entity: InventoryFull;

  IsNew: boolean;

  Orgin: InventoryFull;

  clientId: string;

  clientInv: ClientInventoryFull;

  constructor(private dialogRef: MatDialogRef<ProductdialogComponent>,
    private service: InvserviceService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.Entity = data.entity;
    this.IsNew = data.isnew;
    this.Orgin = data.orgin;
    this.clientId = data.clientId;
    this.clientInv = data.clientInv;
    }


  ngOnInit() {
  }

  public Save() {

    if (isNullOrUndefined(this.Entity.ProductId)) {
      alert('不能沒有編號');
      return;
    }

    this.spinner.show();


    if (this.IsNew) {
      this.service._addFullInvEntity(this.Entity, this.clientId).subscribe(
        val => {
          alert('新增完成');
          this.clientInv.Inventories.push(this.Entity);
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
      this.service._updateFullInvEntity(this.Entity, this.clientId).subscribe(
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


}
