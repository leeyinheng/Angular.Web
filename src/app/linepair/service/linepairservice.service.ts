import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { LinePairUser, LinePairPayment, LinePairArrange} from '../model/user';
import { isNullOrUndefined } from 'util';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LinepairserviceService {

  private site = 'https://leecloud.azurewebsites.net/';  // URL to web api

  private url = 'api/linepairapi/';

  constructor( private http: HttpClient , private router: Router) { }

  public getUserList() {

    const url = this.site + this.url;

    return this.http.get<LinePairUser[]>(url);

  }

  public getEntityById(id: string) {

    const url  =  this.site + this.url + '/' + id;

    return this.http.get<LinePairUser>(url);
  }

  public postEntity(entity: LinePairUser) {

    const url =  this.site + this.url;

    return this.http.post(url, entity);
  }

  public deleteEntity( id: string) {

    const url = this.site + this.url + '/' + id;

    return this.http.delete(url);
 }


}
