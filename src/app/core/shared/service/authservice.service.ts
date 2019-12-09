import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LogInUser} from '../model/user';
import { isNullOrUndefined } from 'util';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private site = 'https://leecloud.azurewebsites.net/';  // URL to web api

  // private site = 'https://localhost:44347/';

  private url = 'api/LoginApi/';

  private urlchecktoken = 'api/LoginApi/CheckToken'

  private token = new BehaviorSubject<string>('');

  currenttoken = this.token.asObservable();

  constructor(private http: HttpClient) { }

  updatetoken(message: string) {
    this.token.next(message);
    localStorage.setItem('token', message);
  }

  public authUser(user: LogInUser) {

    const url = this.site + this.url;
  
     // Headers
     const headers = new HttpHeaders ({
      ContentType: 'application/json'
    });
  
  
    // return  this.http.post(url, file, {headers: headers});
  
    return this.http
        .post<string>(
            url,
            user,
        { headers, responseType: 'text' as 'json' }
        );
     }

  public checktoken(){

    const currenttoken = localStorage.getItem('token');

    // alert(currenttoken);

    const url = this.site + this.urlchecktoken;
  
     // Headers
     const headers = new HttpHeaders ({
      ContentType: 'application/json'
    });
      
  
    return this.http
        .post<string>(
            url,
            currenttoken,
        { headers, responseType: 'text' as 'json' }
        );
  }

  

}
