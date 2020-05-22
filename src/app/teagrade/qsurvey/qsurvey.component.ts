import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TeagradeserviceService} from '../service/teagradeservice.service';
import {Survey, WebSurvey} from '../model/survey';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-qsurvey',
  templateUrl: './qsurvey.component.html',
  styleUrls: ['./qsurvey.component.css']
})
export class QsurveyComponent implements OnInit {

  Entity: WebSurvey;

  constructor(private router: Router, private service: TeagradeserviceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    const newSurvey = new WebSurvey();

    newSurvey.Survey = this.service.getSurvey();

    this.Entity = newSurvey;
  }

  public SaveEntity() {

    this.spinner.show();

    this.service.save(this.Entity).subscribe(val => {
      alert('上傳成功! 感謝您的時間, 我們會定期通知您有關普洱茶最新資訊!');
      this.spinner.hide();
      this.router.navigate(['/teagrade']);
    });
  }

}
