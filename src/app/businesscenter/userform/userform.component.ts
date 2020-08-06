import { Component, OnInit } from '@angular/core';
import {BcserviceService} from '../service/bcservice.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Vendor, User, User_poco } from '../model/Inhub';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  isAdd = false;

  isAdmin = false;

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

          if (this.Entity._id.length > 5 && this.Entity._id.startsWith('admin', 0)) {
            this.isAdmin = true;
          }

          if (this.Entity._id.length > 5 && this.Entity._id.startsWith('Admin', 0)) {
            this.isAdmin = true;
          }

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

  alert(this.vendorId);

  this.bcservice.assignVendor(this.Entity._id, this.vendorId).subscribe(val => {
    alert('Assign complete');
  },
  err => {
    alert('assign error');
  });

}

onChangeEvent(event: any) {
  const value = event.target.value;
  if (value.length > 5 && value.startsWith('admin', 0)) {
    this.isAdmin = true;
  } else {
    this.isAdmin = false;
  }
}

filterForArticles(filterVal: string) {

  if (filterVal === '-1') {

  } else {

    this.vendorId = filterVal;
  }

}

public UpdatePassword() {

  this.bcservice.updatePassword(this.Entity._id, this.Entity.password).subscribe(val => {
    alert('Update Password complete');
  },
  err => {
    alert('Update Password error');
  });

}

public  SaveEntity() {

  if (isNullOrUndefined(this.Entity._id) || this.Entity._id === '') {
     alert('請輸入 ID 欄位');
     return;
   }

    this.spinner.show();

    const userpoco = new User_poco;

    userpoco.Id = this.Entity._id;
    userpoco.FirstName = this.Entity.firstName;
    userpoco.LastName = this.Entity.lastName;
    userpoco.Password = this.Entity.password;
    userpoco.Address = this.Entity.address;
    userpoco.Cell = this.Entity.cell;
    userpoco.DateJoined = this.Entity.dateJoined;
    userpoco.Email = this.Entity.eMail;
    userpoco.Points = this.Entity.points;
    userpoco.Referral = this.Entity.referral;

    // alert(this.Entity.referral);

    if (this.isAdd === true) {

      this.bcservice.postUser(userpoco).subscribe(
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

      this.bcservice.updateUser(userpoco).subscribe(
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
