import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-w3',
  templateUrl: './w3.component.html',
  styleUrls: ['./w3.component.css'],
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
export class W3Component implements OnInit {

  Title = '喜婦微晶木砧板 特色 : 具木材質感與特性';

  Content = '	硬度適宜彈性佳，舒適刀感、不損刀口、不滑刀與不黏刀。適合砧板刀工的0.8完美比重';

  constructor(private router: Router, private title: Title) { }

  ngOnInit() {  this.title.setTitle('未來木砧板');
  }


  public click1() {
    this.router.navigate(['/w4']);
  }

  public click2() {
    this.router.navigate(['/w2']);
  }


}
