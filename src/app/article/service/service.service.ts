import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Article} from '../model/articlemodel';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private site = 'https://leecloud.azurewebsites.net/';  // URL to web api

  private url = 'api/articleapi/';

  private postImgurl = 'api/UploadFileapi/';

  constructor(
    private http: HttpClient
  ) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  public getList() {

    const url  = this.site + this.url;

    return this.http.get<Article[]>(url);
  }

  public getEntityById(id: string) {

    const url  = this.site + this.url + id;

    return this.http.get<Article>(url);
  }

  public postEntity(entity: Article) {

    const url = this.site + this.url;

    return this.http.post(url, entity);
  }

 public putEntity( entity: Article) {

  const url = this.site + this.url + entity.Id;

  this.http.put(url, entity) .subscribe(
    val => {
        console.log('PUT call successful value returned in body',
                    val);
    },
    response => {
        console.log('PUT call in error', response);
    },
    () => {
        console.log('The PUT observable is now completed.');
    }
  );

 }


 public deleteEntity( id: string) {

    const url = this.site + this.url + id;

    return this.http.delete(url);
 }

 public postImage(file: FormData) {

    const url = this.site + this.postImgurl;

     // Headers
     const headers = new HttpHeaders ({
      ContentType: 'multipart/form-data'
    });


    // return  this.http.post(url, file, {headers: headers});

    return this.http
        .post<string>(
            url,
            file,
        { headers, responseType: 'text' as 'json' }
        );


 }



}
