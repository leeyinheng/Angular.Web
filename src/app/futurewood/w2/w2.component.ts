import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-w2',
  templateUrl: './w2.component.html',
  styleUrls: ['./w2.component.css'],
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
export class W2Component implements OnInit {

  Title = '喜婦微晶木砧板 特色 : 世界級環保';

  Content = '採用全世界公認環保無毒TPE原料 利用高科技環保材料TPE(高分子材料熱可塑性彈性體)，結合創新發泡技術，開發出獨一無二的環保材質 。 做出具有木頭質感的創新材料。這種創新砧板的發泡體均是獨立氣孔(closecell)加上材料本身無添加任何的木粉，所以具有100%防水的功能，剛性強材質穩定不易變形，且可以100%回收再利用。';

  constructor(private router: Router, private title: Title) { }

  ngOnInit() {  this.title.setTitle('未來木砧板');
  }


  public click1() {
    this.router.navigate(['/w3']);
  }

  public click2() {
    this.router.navigate(['/w1']);
  }


}
