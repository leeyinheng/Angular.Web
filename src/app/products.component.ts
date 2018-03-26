import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Product} from './Services/Model/product'; 

//import { Hero } from './hero';
import { ProductService } from './Services/product.service';
import { ShopCartService } from './Services/shop-cart.service';

@Component({
  moduleId: module.id,
  selector: 'products',
  templateUrl: 'products.component.html', 
 
  //styleUrls: [ 'dashboard.component.css' ]

})
export class ProductsComponent implements OnInit {

  products:Product[];
  count:number;
  totalprice:number; 

//son como un providers
  constructor(
  private router: Router,
  private productService: ProductService,
  private shopcartservice: ShopCartService
  ) { }

  ngOnInit(): void {

    this.products = this.productService.getSamples(); 

    this.updatecount(); 

  
  }

  add(product: Product): void {
    
   

    this.shopcartservice.add(product); 

    this.updatecount(); 
  
  }

  remove(product: Product) : void{

   
    this.shopcartservice.remove(product); 

    this.updatecount(); 
  
    
  }

  updatecount() : void{

        this.count = this.shopcartservice.con(); 

        this.totalprice = this.shopcartservice.totalamount(); 

  }

 
}
