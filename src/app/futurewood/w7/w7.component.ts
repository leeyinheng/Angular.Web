import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-w7',
  templateUrl: './w7.component.html',
  styleUrls: ['./w7.component.css'],
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
export class W7Component implements OnInit {

  Title = '喜婦微晶木砧板 特色 : 100% 台灣製造 Made In Taiwan';

  Content = '此產品從研發專利和生產都是百分之百台灣自製產品, 世界獨一無二的創新產品, 未來的世界環保材質必然會有微晶未來木的一席地位! 	';

  constructor(private router: Router, private title: Title) { }

  ngOnInit() {  this.title.setTitle('未來木砧板');
  }


  public click1() {
    this.router.navigate(['/w8']);
  }

  public click2() {
    this.router.navigate(['/w6']);
  }


}
