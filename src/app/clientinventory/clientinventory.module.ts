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
import { InvlistComponent } from './invlist/invlist.component';
import { LoginComponent } from './login/login.component';
import { CustomMaterialModule} from '../core/material.module';
import { PortalComponent } from './portal/portal.component';
import {SharedModule} from '../core/shared/shared.module';
import {ClipboardModule} from 'ngx-clipboard';
import { AdimageComponent } from './adimage/adimage.component';



@NgModule({
  declarations: [InvuploadComponent, InvshowComponent, InvlistComponent, LoginComponent, PortalComponent, AdimageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgxFileDropModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    FormsModule,
    CustomMaterialModule,
    ClipboardModule,
    SharedModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'uploadinvfile', component: InvuploadComponent
      },
      {
        path: 'clientinv/:id', component: InvshowComponent
      },
      {
        path: 'clientlist', component: InvlistComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'teaportal', component: PortalComponent
      },
      {
        path: 'adimage', component: AdimageComponent
      }
    ])
  ],
  providers: []
})
export class ClientinventoryModule { }
