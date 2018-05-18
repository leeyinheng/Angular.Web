import { Component, OnInit } from '@angular/core';

import { ShopCartService } from './Services/shop-cart.service';

import {Product} from './Services/Model/product'; 

import { EmailService } from './Services/emailservice';

@Component({
  moduleId: module.id,
  selector: 'cart',
  templateUrl: 'cart.component.html',
 
  //styleUrls: [ 'dashboard.component.css' ]

})
export class CartComponent implements OnInit {

  count: number; 

  shoplist: Product[]; 

  totalamount : number; 
  
  sumuplist: Product[]; 

  htmlstring: string; 

  Name: string; 

  Address: string; 

  Phone: string; 

  Note: string = '';

  Email: string; 

  paymenttype: string; 

  shipmentfee: number = 0; 

  constructor(
    private shopcartservice: ShopCartService, 
    private emailservice: EmailService
  ) { }

  ngOnInit(): void {

      this.count = this.shopcartservice.con();

      this.shoplist = this.shopcartservice.shopList; 

      this.totalamount = this.shopcartservice.totalamount(); 

      this.shopcartservice.sumup(); 

      this.sumuplist = this.shopcartservice.sumupList; 

      this.caculateshipping(); 

    }

  countShopList(): void {
    this.count = this.shopcartservice.con();
  }

   remove(product: Product) : void{

    this.shopcartservice.remove(product); 

    this.updatecount(); 

    this.caculateshipping(); 
  
    
  }

  add(product: Product): void{

    this.shopcartservice.add(product); 

    this.updatecount(); 

    this.caculateshipping(); 

  }

  updatecount() : void{

        this.count = this.shopcartservice.con(); 

        this.totalamount = this.shopcartservice.totalamount(); 

        this.shopcartservice.sumup(); 

        this.sumuplist = this.shopcartservice.sumupList; 

  }

  gethtmlstring() {

       return this.shopcartservice.gethtml(); 
  }

  caculateshipping() :void{

      if(this.totalamount <2000 && this.totalamount != 0)
      {
        this.shipmentfee = 95; 
      }
      else 
      {
        this.shipmentfee = 0; 
      }
  }

  submitorder(): void{

      if (this.validate() == true && confirm("請確認您的訂購資訊: 總價-" + this.totalamount + "|電話-" + this.Phone + "|Email-" + this.Email + "|送件地址-"+ this.Address))
      { 
         let ordernumber: string = "BC" + Number(new Date()); 

         
         this.htmlstring = "<style> table {border-collapse: collapse; width: 70%;} th, td {padding: 8px;text-align: left;border-bottom: 1px solid #ddd;}</style>"; 
         this.htmlstring = "<div>訂購人: " + this.Name + "</div><p>";
         this.htmlstring += "<div>電話: " + this.Phone + "</div><p>";
         this.htmlstring += "<div>Email: " + this.Email + "</div><p>";
         this.htmlstring += "<div>地址: " + this.Address + "</div><p>";
         this.htmlstring += "<div>備註: " + this.Note + "</div><p>";


         this.htmlstring += this.shopcartservice.gethtml(); 

         this.htmlstring += "<table width='70%' border-collapse='collapse' border='0'><tr><td>總數量:" + this.count + "</td>" + "</tr><tr><td>產品價格:" + this.totalamount + "</td><td>運費:" + this.shipmentfee +"</td><td>總價:" + (this.totalamount + this.shipmentfee) + "</td></tr>"; 

         this.htmlstring += "<tr><td>付款方式:" + this.paymenttype  + "</td></row></table>";   

         var subject = "中華生物科技訂單編號: " + this.generateordernumber()

        //  this.emailservice.(this.Email, subject, this.htmlstring)
        //   .subscribe(
        //              res  => console.log(res),
        //              error =>  console.log(<any>error))
        //  ; 

          alert("此功能停止使用 !! 感謝您的訂購, 您的訂單編號: " + this.generateordernumber() + " 已送出, 我們專員會與您聯絡訂購事項" ); 

          window.location.href = "/";
      }


  }

  generateordernumber(){

       return this.shopcartservice.generateordernumber(); 

  }

  validate(){

      if (this.Name == null || this.Name == '')
      {
        alert("姓名" + " 不能空白"); 
        
        return false; 
      }

       if (this.Address == null || this.Address == '')
      {
        alert("地址" + " 不能空白"); 
        
        return false; 
      }

       if (this.Email == null || this.Email == '')
      {
        alert("Email" + " 不能空白"); 
        
        return false; 
      }

       if (this.Phone == null || this.Phone == '')
      {
        alert("電話" + " 不能空白"); 
        
        return false; 
      }

      if (this.paymenttype == null || this.paymenttype == '')
      {
        alert("請選擇付款方式")

        return false; 
      }

      return true; 


  }
}
