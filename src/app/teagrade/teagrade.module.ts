import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Q1Component} from './q1/q1.component';
import {Q2Component} from './q2/q2.component';
import {Q3Component} from './q3/q3.component';
import {Q4Component} from './q4/q4.component';
import {Q5Component} from './q5/q5.component';
import {Q6Component} from './q6/q6.component';
import {Q7Component} from './q7/q7.component';
import {Q8Component} from './q8/q8.component';
import {QfinalComponent} from './qfinal/qfinal.component';
import { CustomMaterialModule} from './../core/material.module';


@NgModule({
  declarations: [Q1Component, Q2Component, Q3Component, Q4Component,
     Q5Component, Q6Component, Q7Component, Q8Component, QfinalComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: 'teagrade', component: Q1Component
      },
      {
        path: 'q1', component: Q1Component
      },
      {
        path: 'q2', component: Q2Component
      },
      {
        path: 'q3', component: Q3Component
      },
      {
        path: 'q4', component: Q4Component
      },
      {
        path: 'q5', component: Q5Component
      },
      {
        path: 'q6', component: Q6Component
      },
      {
        path: 'q7', component: Q7Component
      },
      {
        path: 'q8', component: Q8Component
      },
      {
        path: 'qfinal', component: QfinalComponent
      }
    ])
  ]
})
export class TeagradeModule { }
