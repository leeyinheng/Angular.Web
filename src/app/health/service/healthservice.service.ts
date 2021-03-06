import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {UserInfo, HealthInfo, HealthHistory} from '../../core/shared/model/userinfo';
import {Weather} from '../../core/shared/model/weather';

@Injectable({
  providedIn: 'root'
})
export class HealthserviceService {

  private site = 'https://leecloud.azurewebsites.net/';  // URL to web api
  // private site = 'https://localhost:44347/';  // URL to web api
  private url = 'api/healthapi/';
  private postImgurl = 'api/UploadWebPhotoapi/';

  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?id=1668284&APPID=678b74a297f51d823a3d69b025b4829a&units=metric';

  list: string[];

  constructor(private http: HttpClient) { }

  public getList() {

    const url  = this.site + this.url;

    return this.http.get<UserInfo<HealthInfo, HealthHistory>[]>(url);
  }

  public getEntityById(id: string) {

    const url  = this.site + this.url + id;

    return this.http.get<UserInfo<HealthInfo, HealthHistory>>(url);
  }

  public postEntity(entity: UserInfo<HealthInfo, HealthHistory>) {

    const url = this.site + this.url ;

    return this.http.post(url, entity);
  }

  public postRefreshEntity(entity: UserInfo<HealthInfo, HealthHistory>) {

    const url = this.site + this.url + '?refresh=true';

    return this.http.post(url, entity);
  }

  public putEntity( entity: UserInfo<HealthInfo, HealthHistory>) {

    const url = this.site + this.url + entity.ClientId;

    return this.http.put(url, entity);
  }

  public deleteEntity( id: string) {

    const url = this.site + this.url + id;

    return this.http.delete(url);
 }

  public deleteEntityHistory(id: string , key: string) {
    const url = this.site + this.url + id + '?key=' + key;

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

  public getTemp() {

    const url = this.weatherUrl;

    return this.http.get<Weather>(url);
  }

}
