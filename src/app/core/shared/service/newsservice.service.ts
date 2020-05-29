import { Injectable } from '@angular/core';
import {News} from './../model/news';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsserviceService {

  private apiKey = 'i3qxjh2Et0AwD1gv736ImR9PR9XfG5FQvh4O_VZCrb_LcKfN';

  private url = 'https://api.currentsapi.services/v1/latest-news?anguage=en&apiKey=' + this.apiKey;

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
