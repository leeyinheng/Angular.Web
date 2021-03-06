import { Component, OnInit } from '@angular/core';

import {customerlog} from './customerlog';

import {CustomerlogService} from './Services/customerlog.service';

import { BsModalService } from 'ngx-bootstrap/modal';

import { BsModalRef } from 'ngx-bootstrap/modal';

import {EmailmodalComponent} from './emailmodal/emailmodal.component';



@Component({
    moduleId: module.id,
    templateUrl:'customerlog.component.html',
    styleUrls:['customerlog.component.css']
})


export class CustomerlogComponent implements OnInit{

    p: number = 1;

    bsModalRef: BsModalRef;

    emailModalRef: BsModalRef;

    constructor(public logservice: CustomerlogService, private modalService: BsModalService  ){

    }

    ngOnInit(): void {

        this.GetLogList();
    }



    _search : string;

    get Search(): string{

        return this._search;

    }

    set Search(value:string)
    {
        this._search = value;

        this.GetLogListByKey(value);
    }


    // tslint:disable-next-line:member-ordering
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


    _channel: string;

    get Channel(): string {

        return this._channel;

    }

    set Channel(value: string)  {

        this._channel = value;

    }

    Comment : string;

    _loglist : customerlog[];

    get logList() : customerlog[]{

        return this._loglist;

    }

    set logList( value :customerlog[] ) {

        this._loglist = value;

    }

    Hidden : string;


    openModal(item: customerlog) {

        const initialState = {
              log: item,
              parent : this.GetLogList
          };

        this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});

    }

    openEmailModal(item: customerlog){
        const initialState = {
            log : item,
            parentFunction: this.GetLogList
        };

        this.emailModalRef = this.modalService.show(EmailmodalComponent, {initialState});
    }

    public GetLogList() : void{

        document.getElementById('loader').style.display = 'block';

        this.logservice.GetAllCustomerLog().subscribe(
            list => {

                this.logList = list;

                document.getElementById('loader').style.display = 'none';
            },
            error =>  alert((<any>error)));


    }

    private GetLogListByKey(key:string) {

        document.getElementById('loader').style.display = 'block';

        this.logservice.GetAllCustomerLogByKey(key).subscribe(
            list => {

                this.logList = list;

                document.getElementById('loader').style.display = 'none';
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

            // newitem.Email = this.Email;

             newitem.PhoneNumber = this.PhoneNumber;

             newitem.Note = this.Note;

             newitem.Comment = this.Comment;

             newitem.Channel = this.Channel;

             newitem.RecordTime = new Date().toLocaleDateString() + "-" + new Date().toLocaleTimeString();


             this.logservice.PostCustomerLog(newitem).subscribe(
                res  => {
                    alert(newitem.Name + ' 資料輸入成功!');
                    this.resetInput();
                    this.GetLogList();
                },
                error =>  alert((<any>error)));


        }


    }



    resetInput(): void {
            this.Name = ''
            this.PhoneNumber = '';
            this.Email = '';
            this.Note = '';
            this.Comment = '';
    }

}


 /* This is a component which we pass in modal*/

 @Component({
    selector: 'modal-content',
    template: `
      <div class="modal-header table-hover">
        <h4 class="modal-title pull-left">{{log.Name}}</h4>
        <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <table class="table table-bordered">
      <tr>
          <td>
              顧客姓名
          </td>
          <td>
          <input type="string"
          [(ngModel)]='Name'
           />
          </td>
      </tr>

      <tr>
          <td>
              電話
          </td>
          <td>
          <input type="string"
          [(ngModel)]='PhoneNumber'
           />
          </td>
      </tr>

      <tr>
      <td>
         銷售管道
      </td>
      <td>
      <mat-form-field>
      <select matNativeControl [(ngModel)]="Channel" required>
        <option value="電話直購">電話直購</option>
        <option value="簡訊促銷">簡訊促銷</option>
        <option value="樂天">樂天</option>
        <option value="蝦皮">蝦皮</option>
        <option value="官網">官網</option>
        <option value="親友員工">親友員工</option>
        <option value="其他">其他</option>
      </select>
    </mat-form-field>
      </td>
      </tr>

      <tr>
      <td>
          通訊紀錄
      </td>
      <td>
         <textarea [(ngModel)]='Note' class="form-control" >

         </textarea>
      </td>
      </tr>
      <tr  class="warning" >
      <td>
          備註(後續進展)
      </td>
      <td>
         <textarea [(ngModel)]='Comment' class="form-control"  >

         </textarea>
      </td>
      </tr>
      <tr >

              <td>
                  <button class="btn btn-primary" (click) = 'savelog()'>
                     儲存
                   </button>

              </td>

        </tr>
    </table>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">取消</button>
      </div>
    `
  })

  export class ModalContentComponent implements OnInit {

    log: customerlog;

    Name: string;

    PhoneNumber : string;

    Email : string;

    Note : string ;

    Comment : string;

    parent : Function;

    Channel: string;


    constructor(public bsModalRef: BsModalRef , public logservice: CustomerlogService ) {}

    ngOnInit() {

        this.Name = this.log.Name;

        this.PhoneNumber = this.log.PhoneNumber;

        this.Email = this.log.Email;

        this.Note = this.log.Note;

        this.Comment = this.log.Comment;

        this.Channel = this.log.Channel;


    }

    savelog(){

      this.log.Name = this.Name;

      this.log.PhoneNumber = this.PhoneNumber;

      this.log.Email = this.Email;

      this.log.Note = this.Note;

      this.log.Comment = this.Comment;

      this.log.Channel = this.Channel;

      this.log.RecordTime = new Date().toLocaleDateString() + "-" + new Date().toLocaleTimeString();

      this.logservice.UpdateCustomerLog(this.log).subscribe(
        res  => {
            alert(  '修改資料成功!');

            this.bsModalRef.hide();

            this.parent.call(this);
        },
        error =>  alert((<any>error)));


    }
  }

