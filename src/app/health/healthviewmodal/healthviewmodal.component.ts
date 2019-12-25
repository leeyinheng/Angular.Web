import { Component, OnInit } from '@angular/core';
import {UserInfo, HealthInfo, HealthHistory, BloodPressure} from '../../core/shared/model/userinfo';

@Component({
  selector: 'app-healthviewmodal',
  templateUrl: './healthviewmodal.component.html',
  styleUrls: ['./healthviewmodal.component.css']
})
export class HealthviewmodalComponent implements OnInit {

  _entity: UserInfo<HealthInfo, HealthHistory > = new UserInfo<HealthInfo, HealthHistory >();

  get Entity(): UserInfo<HealthInfo, HealthHistory > {
      return this._entity;
  }

  set Entity( value: UserInfo<HealthInfo, HealthHistory >) {
      this._entity = value;
  }

  History: HealthHistory;


  constructor() { }

  ngOnInit() {
  }

  public newblood() {
    const newblood = new BloodPressure();
    const now = new Date;
    newblood.DateTime = now.getFullYear().toString() + '/' + now.getMonth().toPrecision() + '/' +  now.getDate().toString();
    this.History.BloodPressures.push(newblood);
  }

}
