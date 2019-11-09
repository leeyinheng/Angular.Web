import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {BusinessCenter, BusinessHour} from '../model/BusinessCenter';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-businesshourmodal',
  templateUrl: './businesshourmodal.component.html',
  styleUrls: ['./businesshourmodal.component.css']
})
export class BusinesshourmodalComponent implements OnInit {

  entity: BusinessCenter;

  list: BusinessHour[] = [{
   Day: '星期一',
   StartTime: '09:00',
   EndTime: '18:00'
  },
  {
    Day: '星期二',
    StartTime: '09:00',
    EndTime: '18:00'
   },
   {
    Day: '星期三',
    StartTime: '09:00',
    EndTime: '18:00'
   },
   {
    Day: '星期四',
    StartTime: '09:00',
    EndTime: '18:00'
   },
   {
    Day: '星期五',
    StartTime: '09:00',
    EndTime: '18:00'
   },
   {
    Day: '星期六',
    StartTime: '09:00',
    EndTime: '18:00'
   },
   {
    Day: '星期日',
    StartTime: '09:00',
    EndTime: '18:00'
   }

  ];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {


    if (isNullOrUndefined(this.entity.BusinessHours) !== true) {
      this.list = this.entity.BusinessHours;
    }

  }

  public Save() {

     this.entity.BusinessHours = this.list;

     this.bsModalRef.hide();

}


}
