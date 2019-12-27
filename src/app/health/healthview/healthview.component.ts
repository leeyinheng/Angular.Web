import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import {UserInfo, HealthInfo, HealthHistory} from '../../core/shared/model/userinfo';
import {HealthserviceService} from './../service/healthservice.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HealthviewmodalComponent } from '../healthviewmodal/healthviewmodal.component';

@Component({
  selector: 'app-healthview',
  templateUrl: './healthview.component.html',
  styleUrls: ['./healthview.component.css']
})
export class HealthviewComponent implements OnInit {

  bsModalRef: BsModalRef;

  refresh = false;

  _list: UserInfo<HealthInfo, HealthHistory>[] = [];

    get List(): UserInfo<HealthInfo, HealthHistory>[] {

        return this._list;

    }

    set List( value: UserInfo<HealthInfo, HealthHistory>[]) {


        this._list = value;

    }



  _entity: UserInfo<HealthInfo, HealthHistory > = new UserInfo<HealthInfo, HealthHistory >();

  get Entity(): UserInfo<HealthInfo, HealthHistory > {

      return this._entity;

  }

  set Entity( value: UserInfo<HealthInfo, HealthHistory >) {


      this._entity = value;

  }



  constructor(private service: HealthserviceService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit() {

    this.GetList();

  }

  public GetList() {

    this.spinner.show();

    this.service.getList().subscribe(val => {
      this.List = val;
      this.spinner.hide();
    },
    err => {
      alert('Not Found');
      this.spinner.hide();
    });

    }

  public addHealthHistory() {

      const newEntity = new HealthHistory();

      const now = new Date;

      newEntity.DateTime = now.getFullYear().toString() + '/' + now.getMonth().toPrecision() + '/' +  now.getDate().toString();

      this.Entity.InfoHistory.push(newEntity);
  }

    filterForArticles(filterVal: string) {

      if (filterVal === '-1') {

      } else {

        this.Entity = this.List[Number(filterVal)];
      }

    }

    openModal() {

      const newEntity = new HealthHistory();

      const now = new Date;

      newEntity.DateTime = now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' +  now.getDate().toString();

      newEntity.WalkSteps = 7000;
      newEntity.Weight = 75;
      newEntity.BloodPressures = [];
      newEntity.Meals = [];

      const initialState = {
            Entity: this.Entity,
            History: newEntity,
            Mode: 'Add'
        };

      this.bsModalRef = this.modalService.show(HealthviewmodalComponent, {initialState});

      this.bsModalRef.setClass('modal-lg');
    }

    public editform(i: number) {

      this.refresh = true;

      const initialState = {
        Entity: this.Entity,
        History: this.Entity.InfoHistory[i],
        Mode: 'Edit'
    };

      this.bsModalRef = this.modalService.show(HealthviewmodalComponent, {initialState});

      this.bsModalRef.setClass('modal-lg');
    }

    public delete(i: number) {

      this.refresh = true;

      i++;

      const orginialItems = this.Entity.InfoHistory;
      const filterItems = orginialItems.slice(0, i - 1).concat(orginialItems.slice(i, orginialItems.length));
      this.Entity.InfoHistory = filterItems;

    }

    public save() {

      this.spinner.show();

      if (this.refresh === true) {

        this.service.postRefreshEntity(this.Entity).subscribe( x => {
          alert('更新完成');
          this.refresh = false;
          this.spinner.hide();
        },
        err => {
          alert('Error');
          this.spinner.hide();
        } );

      } else {

        this.service.postEntity(this.Entity).subscribe( x => {
          alert('新增完成');
          this.refresh = false;
          this.spinner.hide();
        },
        err => {
          alert('Error');
          this.spinner.hide();
        } );

      }


    }
}
