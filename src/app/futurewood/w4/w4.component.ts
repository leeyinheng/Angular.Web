import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-w4',
  templateUrl: './w4.component.html',
  styleUrls: ['./w4.component.css'],
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
export class W4Component implements OnInit {

  Title = '喜婦微晶木砧板 特色 : 越用越亮麗 百分百無毒';

  Content = 'TPE屬天然高分子聚合物，不會產生細屑。具有親油防水之特性，能使砧板越用越亮麗。 食品級抗菌率達99.99%經國際SGS認證檢測，由內到外全面抗菌，抗菌率達99.99%，永不滋生霉菌。';

  constructor(private router: Router, private title: Title) { }

  ngOnInit() {  this.title.setTitle('未來木砧板');
  }


  public click1() {
    this.router.navigate(['/w5']);
  }

  public click2() {
    this.router.navigate(['/w3']);
  }


}
