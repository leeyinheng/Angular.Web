import { Injectable } from '@angular/core';
import {News} from './../model/news';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsserviceService {

  private apiKey = '08e7ba32ec0440c8ab88ac2e9a980d4a';

  private url = 'http://newsapi.org/v2/top-headlines?country=us&apiKey=' + this.apiKey;

  constructor(private http: HttpClient) { }

  public getnews() {

     // Headers
     const headers = new HttpHeaders ({
      ContentType: 'application/json'
    });

    return this.http
        .get<News>(
            this.url
        );
  }
}
