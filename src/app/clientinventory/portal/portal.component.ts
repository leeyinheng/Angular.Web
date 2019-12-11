import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {InvserviceService} from '../invservice.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  User: string;
  LogInTime: string;
  LastUpdateTime: string;

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
  }

  public logout() {
    this.authservice.logout();
    this.router.navigate(['login']);
  }

}
