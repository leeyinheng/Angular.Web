import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {LogInUser, AppUser} from '../../core/shared/model/user';

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

    const user = new AppUser();

    const datestring = new Date().toLocaleString();

    user.UserID = this.username;
    user.Password = this.password;
    user.Application = 'TeaProject';
    user.LogInTime = datestring;
    this.service.authUser(user).subscribe(res => {
        alert('歡迎使用者:' + res.Name + ' 您上次登入時間:' + res.LastLogInTime );
       // alert(res.Token);
        localStorage.setItem('user', res.Name);
        localStorage.setItem('logintime', datestring);
        this.service.updatetoken(res.Token);
        this.router.navigate(['teaportal']);
      },
      err => {
        alert('登入錯誤 請重新登入');
        this.service.deletetoken();
    });
  }


}
