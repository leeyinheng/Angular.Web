import { Injectable } from '@angular/core';
import {Product} from './Model/product'; 



@Injectable()
export class ShopCartService {
  shopList : Product[] =[];
  
  sumupList : Product[]; 

  add(product: Product): void {
    this.shopList.push(product);
  }

  remove(product: Product): void {

    if (this.shopList.length >0)
    {
          var i = this.shopList.indexOf(product);   


          if (i != -1)
          {

              this.shopList.splice(i,1); 
                 
          }

         
    }
  }
  
  
  con() {

   return this.shopList.length;
  
}

  totalamount() {
     
     var total = 0 ; 

     this.shopList.forEach(p => {
     
       total += p.Price; 

     });

     return total; 

  }

  sumup(){

    this.sumupList = []; 

    if (this.shopList.length > 0)
    {
         for (let p of  this.shopList) {

           if (this.sumupList.indexOf(p) === -1)
           {
             p.Volume = 1; 

             p.SellPrice = p.Price; 

             this.sumupList.push(p); 
           }
           else 
           {
             var vol = this.sumupList[this.sumupList.indexOf(p)].Volume;

             vol++;  
             
             this.sumupList[this.sumupList.indexOf(p)].Volume = vol; 

             this.sumupList[this.sumupList.indexOf(p)].SellPrice = p.Price * vol; 
           }

         }
     }

  }

  gethtml(){

      let htmlstring:string  = ''; 

      if(this.sumupList.length > 0)
      {
        htmlstring =  "<table width='80%' border='1px solid #dddddd'>" + 
                "<thead>" +
                 "<tr align='left'>" +
                        "<th>產品</th>" +
                        "<th>數量</th>" +
                        "<th>價格</th>"+
                    "</tr>" +
                "</thead>" +
                "<tbody>"; 
            
       for (let p of this.sumupList)
       {
         htmlstring += "<tr align='left'>" +
                       "<td>" + 
                       p.Name + 
                       "</td><td>" + 
                       p.Volume + 
                       "</td><td>" + 
                       p.SellPrice + 
                       "</td>"; 
       }

       htmlstring += "</tbody></table>"; 

      }

      return htmlstring; 

  }

   generateordernumber(){

        var dateobj= new Date() ;
        var month = dateobj.getMonth() + 1;
        var day = dateobj.getDate() ;
        var year = dateobj.getFullYear();
        var hour = dateobj.getHours();
        var min = dateobj.getMinutes(); 
        var sec = dateobj.getSeconds();

      
        var ordernumber = year + "-" + month + "-" + day + "-" + hour + "-" + min + "-" + sec; 
        return "BC" + ordernumber; 

  }
}
