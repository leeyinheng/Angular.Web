import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { InventoryFull, ClientInventoryFull, InventoryTrade, TradeConfirm} from '../model/projectinventory';
import {InvserviceService} from '../invservice.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-tradedialog',
  templateUrl: './tradedialog.component.html',
  styleUrls: ['./tradedialog.component.css']
})
export class TradedialogComponent implements OnInit {

  List: InventoryTrade[];
  orgList: ClientInventoryFull[]
  TradeInfo: string;
  TradeAmount: number;
  toClientId: string;



  constructor(private dialogRef: MatDialogRef<TradedialogComponent>,
    private service: InvserviceService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.List = data.list;
    this.orgList = data.orgList;
    }

  ngOnInit() {
  }


  public Cancel() {
    this.dialogRef.close(null);
  }

  public Confirm() {

    if ( isNullOrUndefined(this.toClientId)) {
      alert('請選擇交易對象');
      return;
    }

    this.spinner.show();

    const tradeinfo = new TradeConfirm();
    tradeinfo.ToClientId = this.toClientId;
    tradeinfo.TradeAmount = this.TradeAmount;
    tradeinfo.TradeInfo = this.TradeInfo;
    tradeinfo.TradeList = this.List;
    this.service._tradeConfirm(tradeinfo).subscribe(val => {
      alert('交易完成! 請重新更新頁面');
      this.dialogRef.close(null);
    },
    err => {
      alert('error-' + err);
    });

    this.spinner.hide();


  }

  public filterForClientId (value) {

    this.toClientId = value;

  }

}
