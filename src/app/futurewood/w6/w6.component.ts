import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-w6',
  templateUrl: './w6.component.html',
  styleUrls: ['./w6.component.css'],
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
export class W6Component implements OnInit {

  Title = '喜婦微晶木砧板 特色 : 容易清洗 安全衛生';

  Content = '砧板使用完畢後，請用清水或海綿搭配一般中性清潔劑洗淨，隨即清潔如新。	根據市場調查及檢測報告，含有高分子水溶性蟹殼素成分能夠幫助有效抑制殘留在表面的細菌, 保障家人的衛生安全';

  constructor(private router: Router, private title: Title) { }

  ngOnInit() {  this.title.setTitle('未來木砧板');
  }


  public click1() {
    this.router.navigate(['/w7']);
  }

  public click2() {
    this.router.navigate(['/w5']);
  }


}
