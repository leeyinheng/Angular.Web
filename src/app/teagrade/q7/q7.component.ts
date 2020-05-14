import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TeagradeserviceService} from '../service/teagradeservice.service';
import {Survey} from '../model/survey';


@Component({
  selector: 'app-q7',
  templateUrl: './q7.component.html',
  styleUrls: ['./q7.component.css']
})
export class Q7Component implements OnInit {

  Entity: Survey;

  A1 = 'A級: 十大茶企';

  A2 = 'B級: 前十名茶企或知名茶人私人訂製';

  A3 = 'C級: 委託加工茶廠 符合地方規範';

  constructor(private router: Router, private service: TeagradeserviceService) { }

  ngOnInit() {
    const newSurvey = new Survey();
    newSurvey.Question = '茶廠?';
    this.Entity = newSurvey;
    this.service.resetSurvey();
  }

  private addSurvey() {
    this.service.addSurvey(this.Entity);

    this.router.navigate(['/q8']);
  }

  public click1() {
    this.Entity.Score = 10;
    this.Entity.Answer = this.A1;
    this.addSurvey();
  }

  public click2() {
    this.Entity.Answer = this.A2;
    this.Entity.Score = 7;
    this.addSurvey();
  }

  public click3() {
    this.Entity.Answer = this.A3;
    this.Entity.Score = 5;
    this.addSurvey();
  }



}
