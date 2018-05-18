import { Injectable } from '@angular/core';

import { EmailService } from '../Services/emailservice';

import {weight} from '../weight'; 

@Injectable()
export class ListEmailService{

    List : any[] = []; 

    WeightList : weight[]; 

    Email : string; 

    Subject : string; 


    constructor(
          private emailservice: EmailService
      ) { }

      generateDateTime():string {
        
                var dateobj= new Date() ;
                var month = dateobj.getMonth() + 1;
                var day = dateobj.getDate() ;
                var year = dateobj.getFullYear();
                var hour = dateobj.getHours();
                var min = dateobj.getMinutes(); 
                var sec = dateobj.getSeconds();
        
              
                var ordernumber = year + "-" + month + "-" + day + "-" + hour + "-" + min + "-" + sec; 

                return  ordernumber; 
        
          }

    SendWeightEmail(sendlist : weight[], emailaddress: string, subject: string) : void 
    {
        this.WeightList = sendlist; 

        this.Email = emailaddress; 

        this.Subject = subject + this.generateDateTime(); 
       

        let htmlstring : string  =  "<table width='80%' border='1px solid #dddddd'>" + 
        "<thead>" +
         "<tr align='left'>" +
                "<th>編號</th>" +
                "<th>空氣重量</th>" +
                "<th>水中重量</th>"+
                "<th>物體比重</th>"+
            "</tr>" +
        "</thead>" +
        "<tbody>"; 

        for (let p of this.WeightList)
        {
            htmlstring += "<tr align='left'>" +
            "<td>" + 
            p.id + 
            "</td><td>" + 
            p.airweight + 
            "</td><td>" + 
            p.waterweight + 
            "</td><td>" + 
            p.ratioweight + 
            "</td>"; 
        }

        htmlstring += "</tbody></table>"; 

    //     this.emailservice.sendemail(this.Email, this.Subject, htmlstring)
    //     .subscribe(
    //                res  => console.log(res),
    //                error =>  console.log(<any>error))
    //    ; 

        alert(" 比重結果已送出至 Email 服務已停止使用!! " + this.Email + " 請繼續使用或更新重來" ); 

    }

   

}

