import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { InventoryFull, ClientInventoryFull, InventoryTrade} from '../model/projectinventory';
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

}
