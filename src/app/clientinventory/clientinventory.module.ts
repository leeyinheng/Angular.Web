import { NgModule } from '@angular/core';
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
import { PortalComponent } from './portal/portal.component';
import {SharedModule} from '../core/shared/shared.module';
import {ClipboardModule} from 'ngx-clipboard';
import { AdimageComponent } from './adimage/adimage.component';
import { SortableModule } from 'ngx-bootstrap';
import { PaymentformComponent } from './paymentform/paymentform.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentlistComponent } from './paymentlist/paymentlist.component';
import { ɵangular_packages_platform_browser_dynamic_testing_testing_b } from '@angular/platform-browser-dynamic/testing';
import {SearchComponent} from './search/search.component';
import { ExtendlistComponent } from './extendlist/extendlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExtenddialogComponent } from './extenddialog/extenddialog.component';
import { ClientInfodialogComponent } from './clientinfodialog/clientinfodialog.component';
import { TradedialogComponent } from './tradedialog/tradedialog.component';
import { ProductdialogComponent } from './productdialog/productdialog.component';
import { MaterialModule } from './../material-module';



@NgModule({
  declarations: [InvuploadComponent, InvshowComponent, InvlistComponent, LoginComponent,
     PortalComponent, AdimageComponent, PaymentformComponent, PaymentlistComponent, SearchComponent,
      ExtendlistComponent, ExtenddialogComponent, ClientInfodialogComponent, TradedialogComponent,
      ProductdialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxFileDropModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    FormsModule,
    ClipboardModule,
    NgbModule,
    MatSelectModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    SharedModule.forRoot(),
    CarouselModule.forRoot(),
    SortableModule.forRoot(),
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
      },
      {
        path: 'payment/:id', component: PaymentformComponent
      },
      {
        path: 'paymentlist', component: PaymentlistComponent
      },
      {
        path: 'searchtea' , component: SearchComponent
      },
      {
        path: 'extendlist', component: ExtendlistComponent
      }
    ])
  ],
  providers: [],
  entryComponents: [
    ExtenddialogComponent,
    ClientInfodialogComponent,
    TradedialogComponent,
    ProductdialogComponent
  ]
})
export class ClientinventoryModule { }
