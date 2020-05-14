import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TeagradeserviceService} from '../service/teagradeservice.service';
import {Survey} from '../model/survey';


@Component({
  selector: 'app-q5',
  templateUrl: './q5.component.html',
  styleUrls: ['./q5.component.css']
})
export class Q5Component implements OnInit {

  Entity: Survey;

  A1 = 'A級: 前二十大茶企製茶師';

  A2 = 'B級: 兩岸知名茶人 台灣有名製茶師';

  A3 = 'C級: 其他 小作坊茶師';

  constructor(private router: Router, private service: TeagradeserviceService) { }

  ngOnInit() {
    const newSurvey = new Survey();
    newSurvey.Question = '製茶師?';
    this.Entity = newSurvey;
    this.service.resetSurvey();
  }

  private addSurvey() {
    this.service.addSurvey(this.Entity);

    this.router.navigate(['/q6']);
  }

  public click1() {
    this.Entity.Score = 20;
    this.Entity.Answer = this.A1;
    this.addSurvey();
  }

  public click2() {
    this.Entity.Answer = this.A2;
    this.Entity.Score = 14;
    this.addSurvey();
  }

  public click3() {
    this.Entity.Answer = this.A3;
    this.Entity.Score = 10;
    this.addSurvey();
  }



}
