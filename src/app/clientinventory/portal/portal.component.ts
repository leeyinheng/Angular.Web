import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor(public authservice: AuthserviceService, private router: Router) { }

  ngOnInit() {
    this.authservice.checktoken().subscribe( val => {
      if (val === 'OK') {
         console.log('log in on ' + Date.now.toString());
      } else {
        alert('權限不足或失效 請重新登入');
        this.router.navigate(['login']);
      }
    });
  }

}
