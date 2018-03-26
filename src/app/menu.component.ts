import { Component, OnInit } from '@angular/core';

import { ShopCartService } from './Services/shop-cart.service';

@Component({
  moduleId: module.id,
  selector: 'menu',
  templateUrl: 'menu.component.html',
  //styleUrls: [ 'dashboard.component.css' ]

})
export class MenuComponent implements OnInit {

  count = 0;

  constructor(
    private shopcartservice: ShopCartService
  ) { }

  ngOnInit(): void {

    }

  countShopList(): void {
    this.count = this.shopcartservice.con();
  }

}
