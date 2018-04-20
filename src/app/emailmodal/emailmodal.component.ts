import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {EmailService} from '../Services/emailservice'; 

import {EmailMessage} from '../Model/EmailMessage'; 

@Component({
  selector: 'app-emailmodal',
  templateUrl: './emailmodal.component.html',
  styleUrls: ['./emailmodal.component.css']
})
export class EmailmodalComponent implements OnInit {

  Name: string; 

  Email : string;

  Subject: string; 

  Content : string; 

  emailfrom : string = 'bio.china@msa.hinet.net'; 
  
  constructor(private emailservice: EmailService, public bsModalRef: BsModalRef ) { }

  ngOnInit() {
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
          this.bsModalRef.hide(); 
        }, 
        error=> {
          alert("郵件-" + this.Subject + " 已送出.." + error); 
          this.bsModalRef.hide(); 
        }
      )

  }

}
