import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {LogInUser} from '../../core/shared/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router, public service: AuthserviceService) { }

  ngOnInit() {
  }

  login(): void {

    const user = new LogInUser();

    user.ID = this.username;
    user.Password = this.password;
    this.service.authUser(user).subscribe(res => {
      if (res === 'Fail'){
         alert('登入錯誤 請重新登入');
      } else {
        this.service.updatetoken(res);
        this.router.navigate(['teaportal']);
      }
      },
      err => {
        alert('內部錯誤');
    });
  }


}
