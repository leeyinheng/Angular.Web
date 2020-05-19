import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TeagradeserviceService} from '../service/teagradeservice.service';
import {Survey, WebSurvey} from '../model/survey';


@Component({
  selector: 'app-qsurvey',
  templateUrl: './qsurvey.component.html',
  styleUrls: ['./qsurvey.component.css']
})
export class QsurveyComponent implements OnInit {

  Entity: WebSurvey;

  constructor(private router: Router, private service: TeagradeserviceService) { }

  ngOnInit() {

    const newSurvey = new WebSurvey();

    newSurvey.Survey = this.service.getSurvey();

    this.Entity = newSurvey;
  }

  private save() {

    this.service.save(this.Entity).subscribe(val => {
      alert('感謝您的時間, 我們會定期與您聯繫有關普洱茶最新資訊!');
    });
  }

}
