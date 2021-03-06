import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TeagradeserviceService} from '../service/teagradeservice.service';
import {Survey} from '../model/survey';


@Component({
  selector: 'app-q8',
  templateUrl: './q8.component.html',
  styleUrls: ['./q8.component.css']
})
export class Q8Component implements OnInit {

  Entity: Survey;

  A1 = 'A級: xxxxx';

  A2 = 'B級: xxxxx';

  A3 = 'C級: xxxxx';

  constructor(private router: Router, private service: TeagradeserviceService) { }

  ngOnInit() {
    const newSurvey = new Survey();
    newSurvey.Question = '原料?';
    this.Entity = newSurvey;
    this.service.resetSurvey();
  }

  private addSurvey() {
    this.service.addSurvey(this.Entity);

    this.router.navigate(['/qfinal']);
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
