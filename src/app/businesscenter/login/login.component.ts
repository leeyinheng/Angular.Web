import { Component, OnInit, ViewChild , ElementRef , NgZone } from '@angular/core';
import {BcserviceService} from '../service/bcservice.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import { AppUser} from '../../core/shared/model/user';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;

  auth2: any;

  constructor(private bcservice: BcserviceService, private spinner: NgxSpinnerService,
    private router: Router, private ngzone: NgZone, public service: AuthserviceService, private title: Title) { }

  ngOnInit() {

    this.title.setTitle('M.O.M 行動辦公室');

    this.googleSDK();

  }

  prepareLoginButton() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
        this.ngzone.run(() => {  this.spinner.show(); });
        const profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        // YOUR CODE HERE
        // alert(profile.getEmail());
       // this.spinner.show();
       const user = new AppUser();

       const datestring = new Date().toLocaleString();
       user.UserID = profile.getEmail();
       user.Password = 'password';
       user.Application = 'BcCenter';
       user.LogInTime = datestring;

       this.service.authUser(user).subscribe(res => {
           alert('歡迎管理員:' + res.Name + ' 您上次登入時間:' + res.LastLogInTime );
           sessionStorage.setItem('loginEmail', profile.getEmail());
           sessionStorage.setItem('loginName', profile.getName());
           this.bcservice.gettoken().subscribe(val => {
            // alert(val.toString());
             sessionStorage.setItem('token', val.toString());
             this.spinner.hide();
             this.ngzone.run(() => {
               this.router.navigate(['bccenter']);
             });
           });
        },
        (error) => {
          alert('帳戶不是管理員 拒絕登入 或聯絡 Henry Lee 加入');
        }
        );

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }

  googleSDK() {

    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '534315275533-6cqgtdgov7b2uoav77rph3ed4a14ktvr.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    };

    (function(d, s, id) {
      // tslint:disable-next-line:prefer-const
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }





}
