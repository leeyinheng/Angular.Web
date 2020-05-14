import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Survey} from '../model/survey';
import { isNullOrUndefined } from 'util';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TeagradeserviceService {

  private site = 'https://leecloud.azurewebsites.net/';  // URL to web api

  //  private site = 'https://localhost:44347/';

   private url = 'api/linepairapi/';

   suveryList: Survey[] = [];

   key = 'teagrade';

  constructor( private http: HttpClient , private router: Router) { }

  public addSurvey(info: Survey) {

    const list = JSON.parse(sessionStorage.getItem(this.key));

    if (isNullOrUndefined(list)) {
      this.suveryList.push(info);
      sessionStorage.setItem(this.key, JSON.stringify(this.suveryList));
    } else {
      const lst = list as Survey[];
      lst.push(info);
      sessionStorage.setItem(this.key, JSON.stringify(lst));
    }

    this.showSurvey();

  }

  public getSurvey() {
    return this.suveryList;
  }

  public getTotalScore() {
    let score = 0;
    this.suveryList.forEach( x => {
      score += x.Score;
    });

    return score;

  }

  public resetSurvey() {
    sessionStorage.clear();
  }

  public refreshSurvy() {
    sessionStorage.clear();
    this.suveryList = [];
  }

  public showSurvey() {
    let popstring = '';
    this.suveryList.forEach(x => {
      popstring += x.Question + '\n';
      popstring += x.Answer + '\n';
    });
    alert(popstring);
  }

}
