import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';
import { HttpClientModule} from '@angular/common/http'; 
//import './rxjs-extensions';

 
//import { InMemoryDataService }  from './in-memory-data.service';

//Services
import { ProductService }    from './Services/product.service';
import { ShopCartService }    from './Services/shop-cart.service';
import { EmailService }    from './Services/emailservice';
import {ListEmailService} from './Services/list-email.service'; 

//Components
import { AppComponent }         from './app.component';
import { ProductsComponent }    from './products.component';
import { MenuComponent }        from './menu.component';
import { CartComponent }        from './cart.component';
import {StoneweightComponent} from './stoneweight.component'; 

import { LocationStrategy, HashLocationStrategy } from '@angular/common';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
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
        path:'cart', 
        component: CartComponent
      },
      {
        path:'stoneweight',
        component: StoneweightComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    ProductsComponent,
    MenuComponent,
    CartComponent,
    StoneweightComponent
  ],

  providers: [
    ProductService,
    ShopCartService, 
    EmailService, 
    ListEmailService, 
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
