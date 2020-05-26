import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import {WoodserviceService} from './../service/woodservice.service';
import { WebSurvey } from '../../teagrade/model/survey';
import {EmailService} from './../../Services/emailservice';


@Component({
  selector: 'app-wsurvey',
  templateUrl: './wSurvey.component.html',
  styleUrls: ['./wSurvey.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(1600)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])]
  })
export class WSurveyComponent implements OnInit {

  Title = '中華生物科技的服務 : 問卷留言';

  Content = '請留下您的聯絡資料或意見,本公司會不定期致贈贈品禮品 期待與您的未來合作';

  Entity: WebSurvey;

  constructor(private router: Router, private title: Title,
              private spinner: NgxSpinnerService,
              private service: WoodserviceService,
              private emailservice: EmailService
              ) { }

  ngOnInit() {
    this.title.setTitle('未來木砧板 問卷');
    const newSurvey = new WebSurvey();
    this.Entity = newSurvey;
  }


  public click1() {
    this.SaveEntity();
  }

  public click2() {
    this.router.navigate(['/w8']);
  }

  private SaveEntity() {

    this.spinner.show();

    this.sendEmail();

    this.service.save(this.Entity).subscribe(val => {

      alert('上傳成功! 感謝您的時間, 我們會不定期通知您有關微晶未來木最新資訊!');
      this.spinner.hide();
      document.location.href = 'http://www.biochina.com.tw';

    });
  }

  private sendEmail() {

    const fromemail = '未來木服務 <NoReply@gmail.com>';

    let emailcontent = '<div> <ul> <li> Name: ' + this.Entity.Name + '</li>';

    emailcontent += '<li> Company: ' + this.Entity.Age + '</li>';

    emailcontent += '<li> Phone: ' + this.Entity.Phone + '</li>';

    emailcontent += '<li> Email: ' + this.Entity.Email + '</li>';

    emailcontent += '<li> Note: ' + this.Entity.Note + '</li>';

    emailcontent += '</ul> </div>';

    this.emailservice.sendemail(fromemail, 'leeyinheng@gmail.com', '【未來木】 Inquery from ' + this.Entity.Age, emailcontent);

  }

}
