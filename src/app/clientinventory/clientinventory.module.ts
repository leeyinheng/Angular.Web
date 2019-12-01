import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { InvuploadComponent } from './invupload/invupload.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop';
import {NgxSpinnerModule} from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InvshowComponent } from './invshow/invshow.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [InvuploadComponent, InvshowComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgxFileDropModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    FormsModule,
    CarouselModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'uploadinvfile', component: InvuploadComponent
      },
      {
        path: 'clientinv/:id', component: InvshowComponent
      }
    ])
  ]
})
export class ClientinventoryModule { }
