import { Component, OnInit } from '@angular/core';
import {BcserviceService} from '../service/bcservice.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Vendor, User } from '../model/Inhub';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  isAdd = false;

  vendorId = '';

  _entity: User = new User();

    get Entity(): User {

        return this._entity;

    }

    set Entity( value: User) {


        this._entity = value;

    }


    _list: Vendor[] = [];

  get List(): Vendor[] {

    return this._list;

  }

  set List(value: Vendor[]) {


    this._list = value;

  }

  constructor(private bcservice: BcserviceService, private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit() {

      /** spinner starts on init */
      this.spinner.show();

      const ID: string = this.route.snapshot.paramMap.get('id');

      this.GetList();

      if (isNullOrUndefined(ID)) {
        this.isAdd = true;
        this.AddNew();
        this.spinner.hide();
      } else {
        this.bcservice.getUser(ID).subscribe(val => {
          this.Entity = val;
          this.spinner.hide();
        },
        err => {
          alert('Not Found');
          this.spinner.hide();
        }
        );
      }
  }

  public GetList() {

    this.spinner.show();

    this.bcservice.getList().subscribe(val => {
      this.List = val;
     // this.spinner.hide();
    },
      err => {
        alert('Not Found');
     //   this.spinner.hide();
      });

  }

  public AddNew() {

    const newEntity = new User();

    this.Entity = newEntity;
}

public AssignVendor() {


  this.bcservice.assignVendor(this.Entity.Id, this.vendorId).subscribe(val => {
    alert('Assign complete');
  },
  err => {
    alert('assign error');
  });

}

filterForArticles(filterVal: string) {

  if (filterVal === '-1') {

  } else {

    this.vendorId = filterVal;
  }

}

public UpdatePassword() {

  this.bcservice.updatePassword(this.Entity.Id, this.Entity.Password).subscribe(val => {
    alert('Update Password complete');
  },
  err => {
    alert('Update Password error');
  });

}

public  SaveEntity() {

  if (isNullOrUndefined(this.Entity.Id) || this.Entity.Id === '') {
     alert('請輸入 ID 欄位');
     return;
   }

    this.spinner.show();

    if (this.isAdd === true) {

      this.bcservice.postUser(this.Entity).subscribe(
        res => {
           alert('新增完畢');
           this.spinner.hide();
           window.open('#/bcuser');
       },
        err => {
          alert(err);
          this.spinner.hide();
        }
      );

    } else {

      this.bcservice.updateUser(this.Entity).subscribe(
        res => {
           alert('更新完畢');
           this.spinner.hide();
         //  window.open('#/bccenter');
       },
        err => {
          alert(err);
          this.spinner.hide();
        }
      );

    }


}

}
