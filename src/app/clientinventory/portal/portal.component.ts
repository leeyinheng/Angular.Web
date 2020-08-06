import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {InvserviceService} from '../invservice.service';
import {Router} from '@angular/router';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  User: string;
  LogInTime: string;
  LastUpdateTime: string;

  SelfFunctionMode = false;  // turn app into self input mode which does not require excel uploading data feed

  selectedVal = '';

  constructor(public authservice: AuthserviceService, private router: Router, private service: InvserviceService) { }

  ngOnInit() {
    this.authservice.checktoken().subscribe( val => {
      if (val === 'OK') {
         this.User = localStorage.getItem('user');
         this.LogInTime = localStorage.getItem('logintime');
         this.service.getLastUpdateTime().subscribe(res => this.LastUpdateTime = res.toString());
      } else {
        alert('權限不足或失效 請重新登入');
        this.router.navigate(['login']);
      }
    });

    const value = sessionStorage.getItem('mode');

    if (!isNullOrUndefined(value)) {

      if (value === 'Self') {
        this.SelfFunctionMode = true;
      } else {
        this.SelfFunctionMode = false;
      }

      this.selectedVal = value;

    }
  }

  public logout() {
    this.authservice.logout();
    this.router.navigate(['login']);
  }

  onValChange(value) {

    if (value === 'Self') {
      this.SelfFunctionMode = true;
    } else {
      this.SelfFunctionMode = false;
    }

    sessionStorage.setItem('mode', value);


  }


}
