import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-w8',
  templateUrl: './w8.component.html',
  styleUrls: ['./w8.component.css'],
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
export class W8Component implements OnInit {

  Title = '中華生物科技的服務 : 代銷和精品贈品客製服務';

  Content = '喜婦微晶未來木砧板未來市場很大, 目前本公司代理團購和精品贈禮市場包括 汽車,購屋及家用高端生活品 , 有興趣請在下頁留資料讓我們專業客服與您聯繫';

  constructor(private router: Router, private title: Title) { }

  ngOnInit() {  this.title.setTitle('未來木砧板');
  }


  public click1() {
    this.router.navigate(['/wsurvey']);
  }

  public click2() {
    this.router.navigate(['/w7']);
  }


}
