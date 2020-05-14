import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TeagradeserviceService} from '../service/teagradeservice.service';
import {Survey} from '../model/survey';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-q2',
  templateUrl: './q2.component.html',
  styleUrls: ['./q2.component.css']
})
export class Q2Component implements OnInit {

  Entity: Survey;

  A1 = 'A級: QS SGS';

  A2 = 'B級: QS SGS';

  A3 = 'C級: QS SGS';

  constructor(private router: Router, private service: TeagradeserviceService) { }

  ngOnInit() {
    const newSurvey = new Survey();
    newSurvey.Question = '認證?';
    this.Entity = newSurvey;
    this.service.resetSurvey();
  }

  private addSurvey() {
    this.service.addSurvey(this.Entity);

    this.router.navigate(['/q3']);
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
