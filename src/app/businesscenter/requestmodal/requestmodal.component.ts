import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {BusinessCenter, Request} from '../model/BusinessCenter';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-requestmodal',
  templateUrl: './requestmodal.component.html',
  styleUrls: ['./requestmodal.component.css']
})
export class RequestmodalComponent implements OnInit {

  entity: BusinessCenter;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  public Save() {


    this.bsModalRef.hide();

  }

  public SendEmail() {


  }


}
