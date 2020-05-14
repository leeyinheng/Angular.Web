import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TeagradeserviceService} from '../service/teagradeservice.service';
import {Survey} from '../model/survey';


@Component({
  selector: 'app-q6',
  templateUrl: './q6.component.html',
  styleUrls: ['./q6.component.css']
})
export class Q6Component implements OnInit {

  Entity: Survey;

  A1 = 'A級: 十大頂級產區';

  A2 = 'B級: 十大中級產區';

  A3 = 'C級: 其他 小產區';

  constructor(private router: Router, private service: TeagradeserviceService) { }

  ngOnInit() {
    const newSurvey = new Survey();
    newSurvey.Question = '產區?';
    this.Entity = newSurvey;
    this.service.resetSurvey();
  }

  private addSurvey() {
    this.service.addSurvey(this.Entity);

    this.router.navigate(['/q7']);
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
