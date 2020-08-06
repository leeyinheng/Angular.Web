import { Component, OnInit } from '@angular/core';
import {BcserviceService} from '../service/bcservice.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BcformmodalComponent} from '../bcformmodal/bcformmodal.component';
import { isNullOrUndefined } from 'util';
import { Vendor } from '../model/Inhub';

@Component({
  selector: 'app-bclist',
  templateUrl: './bclist.component.html',
  styleUrls: ['./bclist.component.css']
})
export class BclistComponent implements OnInit {

  constructor(private bcservice: BcserviceService, private spinner: NgxSpinnerService
    , private modalService: BsModalService) { }

    pophtml: string;

    bsModalRef: BsModalRef;

  _list: Vendor[];

    get List(): Vendor[] {

        return this._list;

    }

    set List( value: Vendor[]) {

        this._list = value;

    }

  ngOnInit() {
    this.GetList();
  }

  public GetList(): void {

    this.spinner.show();

    this.bcservice.getList().subscribe(
        list => {
            this.List = list;
            this.spinner.hide();
        }
    );

  }

  public openform(Id: string) {
    window.open('#/bcform/' + Id, '_self');
  }

  public showform(Id: string) {
    window.open('#/bcshow/' + Id, '_self');
  }

  public delete(Id: string) {

    if (confirm('確定刪除 ID: ' + Id + '?')) {

      this.List.forEach( (item, index) => {
        if (item._id === Id) {
          this.List.splice(index, 1);
        }
      });

      this.bcservice.deleteEntity(Id).subscribe(
        res => {
          console.log(res);
          alert('已刪除 Id:' + Id);
        },
        err => {
          alert(err);
        }
      );

    }
  }

  public popup(item: Vendor) {
    const initialState = {
      entity: item
  };

  let imageurl = '';

  if (isNullOrUndefined(item.imageUrls) !== true) {
    imageurl = item.imageUrls[0];
  }

   this.pophtml = '<talbe> <tr> <td>' + item.intro + '</td> </tr>';
   this.pophtml += '<tr><td>' + '<img src=https://in-hub-dev.azurewebsites.net/' + imageurl + ' width=90% height=90%> </td></tr>';
   this.pophtml += '</table>';


    // this.bsModalRef = this.modalService.show(BcformmodalComponent, {initialState});
  }

  public closepopup() {
    this.bsModalRef.hide();
  }

}
