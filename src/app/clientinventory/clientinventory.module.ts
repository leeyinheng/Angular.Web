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


@NgModule({
  declarations: [InvuploadComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgxFileDropModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'uploadinvfile', component: InvuploadComponent
      },
    ])
  ]
})
export class ClientinventoryModule { }
