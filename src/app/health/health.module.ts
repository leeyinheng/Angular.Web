import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthviewComponent } from './healthview/healthview.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop';
import {NgxSpinnerModule} from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ModalModule} from 'ngx-bootstrap';
import { HealthviewmodalComponent } from './healthviewmodal/healthviewmodal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {SharedModule} from '../core/shared/shared.module';


@NgModule({
  declarations: [HealthviewComponent, HealthviewmodalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    NgxPaginationModule,
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'health', component: HealthviewComponent
      },
    ])
   ],
  entryComponents: [HealthviewmodalComponent]
  })
export class HealthModule { }
