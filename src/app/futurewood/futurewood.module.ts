import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomMaterialModule} from './../core/material.module';
import { SharedModule } from './../../app/core/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {W1Component} from './w1/w1.component';
import {W2Component} from './w2/w2.component';
import {W3Component} from './w3/w3.component';
import {W4Component} from './w4/w4.component';
import {W5Component} from './w5/w5.component';
import {W6Component} from './w6/w6.component';
import {W7Component} from './w7/w7.component';
import {W8Component} from './w8/w8.component';
import {WSurveyComponent} from './wSurvey/wSurvey.component';
@NgModule({
  declarations: [W1Component,
                 W2Component,
                 W3Component,
                 W4Component,
                 W5Component,
                 W6Component,
                 W7Component,
                 W8Component,
                 WSurveyComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    NgbModule,
    SharedModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      {
        path: 'w1', component: W1Component
      },
      {
        path: 'w2', component: W2Component
      },
      {
        path: 'w3', component: W3Component
      },
      {
        path: 'w4', component: W4Component
      },
      {
        path: 'w5', component: W5Component
      },
      {
        path: 'w6', component: W6Component
      },
      {
        path: 'w7', component: W7Component
      },
      {
        path: 'w8', component: W8Component
      },
      {
        path: 'wsurvey', component: WSurveyComponent
      }
    ])
  ]
})
export class FuturewoodModule { }
