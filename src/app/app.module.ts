import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { SharedModule } from './core/shared/shared.module';
//import './rxjs-extensions';

//import { InMemoryDataService }  from './in-memory-data.service';

//Services
import { ProductService } from './Services/product.service';
import { ShopCartService } from './Services/shop-cart.service';
import { EmailService } from './Services/emailservice';
import { ListEmailService } from './Services/list-email.service';
import { CustomerlogService } from './Services/customerlog.service';
import { InvserviceService } from './clientinventory/invservice.service';

//Components
import { AppComponent } from './app.component';
import { ProductsComponent } from './products.component';
import { MenuComponent } from './menu.component';
import { CartComponent } from './cart.component';
import { StoneweightComponent } from './stoneweight.component';
import { CustomerlogComponent } from './customerlog.component';
import { ModalContentComponent } from './customerlog.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { EmailmodalComponent } from './emailmodal/emailmodal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusinesscenterModule } from './businesscenter/businesscenter.module';
import { ArticleModule } from './article/article.module';
import { ClientinventoryModule } from './clientinventory/clientinventory.module';
import { HealthModule } from './health/health.module';
import { IgxCarouselModule } from 'igniteui-angular';
import { MaterialModule } from './material-module';
import { LinepairModule} from './linepair/linepair.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule,
    LinepairModule,
    NgbModule,
    SharedModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/stoneweight',
        pathMatch: 'full'
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'stoneweight',
        component: StoneweightComponent
      },
      {
        path: 'customerlog',
        component: CustomerlogComponent
      }
    ]),
    BusinesscenterModule,
    ArticleModule,
    ClientinventoryModule,
    HealthModule,
    IgxCarouselModule
  ],
  declarations: [
    AppComponent,
    ProductsComponent,
    MenuComponent,
    CartComponent,
    StoneweightComponent,
    CustomerlogComponent,
    ModalContentComponent,
    EmailmodalComponent
  ],
  entryComponents: [ModalContentComponent, EmailmodalComponent],
  providers: [
    ProductService,
    ShopCartService,
    EmailService,
    ListEmailService,
    CustomerlogService,
    BsModalService,
    InvserviceService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
