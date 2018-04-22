import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {EmailService} from '../Services/emailservice'; 

import {EmailMessage} from '../Model/EmailMessage'; 

import {customerlog} from '../customerlog'; 

import {CustomerlogService} from '../Services/customerlog.service'; 

@Component({
  selector: 'app-emailmodal',
  templateUrl: './emailmodal.component.html',
  styleUrls: ['./emailmodal.component.css']
})
export class EmailmodalComponent implements OnInit {

  log: customerlog; 

  Name: string; 

  Email : string;

  _subject : string; 

    get Subject():string{

        return this._subject; 
    
    }
    set Subject(value:string){

        this._subject = value;    
    }

  Content : string; 

  emailfrom : string = 'bio.china@msa.hinet.net'; 

  parentFunction : Function; 
  
  

  constructor(private emailservice: EmailService, public bsModalRef: BsModalRef, private logservice: CustomerlogService ) { }

  ngOnInit() {
    
    this.Email = this.log.Email; 
    
    this.Name = this.log.Name; 
    
  }

  EmailOut(){
    
      let newEmail = new EmailMessage(); 

      newEmail.FromEmailAddress = this.emailfrom; 

      newEmail.ToEmailAddress = this.Email; 

      newEmail.Name = this.Name; 

      newEmail.Subject = this.Subject; 

      newEmail.Content = this.Content; 

      this.emailservice.SendEmailMessage(newEmail).subscribe(
        res => {

          alert("郵件-" + this.Subject + " 已送出"); 

          this.RecordEmailEvent(this.log); 
         
        
        }, 
        error=> {
        
          alert("郵件-" + this.Subject + " 錯誤.." + error); 
        
          this.bsModalRef.hide(); 
        
        }
      )

  }

  RecordEmailEvent(log:customerlog)
  {
       
          log.Comment += " 寄出郵件:"  + this.Subject + " | " + new Date().toLocaleDateString() + "-" + new Date().toLocaleTimeString();
              
          this.logservice.UpdateCustomerLog(log).subscribe(
            res  => {
                       
              this.parentFunction; 

              this.bsModalRef.hide();
                       
            },
            error =>  alert((<any>error))); 
    
            
        
  }

}
