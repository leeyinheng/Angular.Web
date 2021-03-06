import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-w1',
  templateUrl: './w1.component.html',
  styleUrls: ['./w1.component.css'],
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
export class W1Component implements OnInit {

  Title = '喜婦微晶木砧板 介紹';

  Content = '喜婦微晶木砧板主要是具有碳(C)與氫(H)以及高分子水溶性蟹殼素(HFP)所組成的天然高分子聚合物，相較於傳統木材無氧，具有親油性、防水、抗菌和耐用等特性,當它使用來切豬肉、雞肉等油性物質時，加深色澤會逐漸擴展至整個表面，使整個砧板更為亮麗耐用。';

  constructor(private router: Router, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('未來木砧板');
  }


  public click1() {
    this.router.navigate(['/w2']);
  }


}
