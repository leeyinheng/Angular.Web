import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Survey, WebSurvey} from './../../core/shared/model/websurvey';
import { isNullOrUndefined } from 'util';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WoodserviceService {

   private site = 'https://leecloud.azurewebsites.net/';  // URL to web api

  // private site = 'https://localhost:44347/';

   private url = 'api/WebSurveyApi/postcellwoodsurvey/888';

  constructor(private http: HttpClient) { }

  public save(entity: WebSurvey) {

    const url = this.site + this.url;

    return this.http.post(url, entity);

  }
}
