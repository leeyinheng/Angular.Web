import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-w5',
  templateUrl: './w5.component.html',
  styleUrls: ['./w5.component.css'],
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
export class W5Component implements OnInit {

  Title = '喜婦微晶木砧板 特色 : 世界級專利 創新美觀的工藝品';

  Content = '世界專利材質，正面採用特殊12道工序鋼琴烤漆， 正常使用下砧板保用20年以上，毋須隱藏砧板，將砧板變為廚房之唯一藝術品。為革命性環保材料所製成，榮獲台灣創新研究獎，並取得台灣美國中國等地區之世界專利';

  constructor(private router: Router, private title: Title) { }

  ngOnInit() {  this.title.setTitle('未來木砧板');
  }


  public click1() {
    this.router.navigate(['/w6']);
  }

  public click2() {
    this.router.navigate(['/w4']);
  }


}
