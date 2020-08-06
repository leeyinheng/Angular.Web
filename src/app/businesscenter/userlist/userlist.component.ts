import { Component, OnInit } from '@angular/core';
import {Vendor, User} from './../model/Inhub';
import {BcserviceService} from '../service/bcservice.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(private bcservice: BcserviceService, private spinner: NgxSpinnerService) { }

  _list: User[];

  get List(): User[] {

      return this._list;

  }

  set List( value: User[]) {

      this._list = value;

  }

  ngOnInit() {
    this.GetList();
  }

  public GetList(): void {

    this.spinner.show();

    this.bcservice.getUserList().subscribe(
        list => {
            this.List = list;
            this.spinner.hide();
        }
    );

  }

  public openform(Id: string) {
    window.open('#/bcuserform/' + Id, '_self');
  }

  public delete(Id: string) {

    if (confirm('確定刪除 ID: ' + Id + '?')) {

      this.List.forEach( (item, index) => {
        if (item._id === Id) {
          this.List.splice(index, 1);
        }
      });

      this.bcservice.deleteUser(Id).subscribe(
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

}
