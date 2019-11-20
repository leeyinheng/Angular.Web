import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import {ModalModule, BsModalService} from 'ngx-bootstrap';
import { BclistComponent } from './bclist/bclist.component';
import { BcformComponent } from './bcform/bcform.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import {NgxSpinnerModule} from 'ngx-spinner';
import { BcformmodalComponent } from './bcformmodal/bcformmodal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BusinesshourmodalComponent } from './businesshourmodal/businesshourmodal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BcshowComponent } from './bcshow/bcshow.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    NgxFileDropModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    GoogleMapsModule,
    TooltipModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'bccenter', component: BclistComponent
      },
      {
        path: 'bcform', component: BcformComponent
      },
      {
        path: 'bcform/:id', component: BcformComponent
      }
    ])
  ],
  declarations: [BclistComponent, BcformComponent, BcformmodalComponent, BusinesshourmodalComponent, BcshowComponent],
  entryComponents: [BcformmodalComponent, BusinesshourmodalComponent]

})
export class BusinesscenterModule { }

