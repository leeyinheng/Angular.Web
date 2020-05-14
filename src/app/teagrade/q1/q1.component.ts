import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TeagradeserviceService} from './../service/teagradeservice.service';
import {Survey} from './../model/survey';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-q1',
  templateUrl: './q1.component.html',
  styleUrls: ['./q1.component.css']
})
export class Q1Component implements OnInit {

  Entity: Survey;

  A1 = 'A級: 茶廠認證/原始包裝/原廠證明';

  A2 = 'B級: 買家信用評量';

  A3 = 'C級: 賣家無上一手的收藏資訊或背景';

  constructor(private router: Router, private service: TeagradeserviceService) { }

  ngOnInit() {
    const newSurvey = new Survey();
    newSurvey.Question = '茶的來源出處?';
    this.Entity = newSurvey;
    this.service.refreshSurvy();
  }

  private addSurvey() {
    this.service.addSurvey(this.Entity);

    this.router.navigate(['/q2']);
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
