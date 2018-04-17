import { Component, OnInit, TemplateRef } from "@angular/core";
 
import {customerlog} from "./customerlog"; 

import {CustomerlogService} from './Services/customerlog.service'; 

import { BsModalService } from 'ngx-bootstrap/modal';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

 


@Component({
    moduleId: module.id,
    templateUrl:'customerlog.component.html', 
    styleUrls:['customerlog.component.css']
})


export class CustomerlogComponent implements OnInit{
    
    ngOnInit(): void {
         
        this.GetLogList(); 
    }

    modalRef: BsModalRef;
    
    constructor(private logservice: CustomerlogService,private modalService: BsModalService ){

    }

    _name : string; 

    get Name(): string {
        
        return this._name; 
    }

    set Name(value:string) {
        
        this._name = value;        

    }

    _phone : string; 

    get PhoneNumber():string{

        return this._phone; 
    
    }

    set PhoneNumber(value:string){

        this._phone = value;
                
    }

    _emailaddress : string; 

    get Email(): string {
    
        return this._emailaddress; 
    
    }

    set Email(value:string)
    {
        this._emailaddress = value; 
    }

    _note : string; 

    get Note(): string {
    
        return this._note; 
    
    }

    set Note(value:string)  {

        this._note = value;

    }

    _loglist : customerlog[]; 

    get logList() : customerlog[]{

        return this._loglist; 

    }

    set logList( value :customerlog[] ) {

        this._loglist = value; 

    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
      }

    GetLogList() :void{

        this.logservice.GetAllCustomerLog().subscribe(
            list => {
                this.logList = list; 
            }, 
            error =>  alert((<any>error))); 
       

    }

    DeleteLog(rowkey:string, key:string)
    {
       if (confirm('確定刪除 ' + key + "?"))
       {
           this.logservice.DeleteCustomerLog(rowkey).subscribe(
            r => {
                alert('資料已被刪除'); 
                this.GetLogList(); 
            }, 
            error =>  alert((<any>error))); 
       }
       
    }

    addlog(){

        
        if (this.Name !== '' && typeof this.Name !== 'undefined')
        {
              
       
             let newitem = new customerlog();  

             newitem.Name = this.Name; 

             newitem.Email = this.Email; 

             newitem.PhoneNumber = this.PhoneNumber; 

             newitem.Note = this.Note; 

             newitem.RecordTime = new Date().toLocaleDateString() + "-" + new Date().toLocaleTimeString();

             
             this.logservice.PostCustomerLog(newitem).subscribe(
                res  => {
                    alert(newitem.Name + ' 資料輸入成功!'); 
                    this.resetInput(); 
                },
                error =>  alert((<any>error))); 
            
             
        }


    }

    resetInput(): void {
            this.Name = ''  
            this.PhoneNumber = ''; 
            this.Email = ''; 
            this.Note = ''; 
    }

}