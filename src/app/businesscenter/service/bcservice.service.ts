import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Request} from '../model/BusinessCenter';
import { Vendor, Gps, Feature, User } from '../model/Inhub';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class BcserviceService {

  private site = 'https://leecloud.azurewebsites.net/';  // URL to web api

  private vendorurl = 'https://in-hub-dev.azurewebsites.net/vendor';

  private userurl = 'https://in-hub-dev.azurewebsites.net/user';

  private tokenurl = 'https://in-hub-dev.azurewebsites.net/user/su/__53cr3t__';

  private url = 'api/businesscenterapi/';

  private postImgurl = '/upload';



  constructor(
    private http: HttpClient
  ) {  this.gettoken(); }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  public gettoken() {
    this.http.get(this.tokenurl, {responseType: 'text'}).subscribe(val => {
      sessionStorage.setItem('token', val.toString());
    });
  }

  public getHttpoption(isImage: boolean = false) {

    const t = sessionStorage.getItem('token');

    if (isImage === true) {

      const headers_object = new HttpHeaders({
        'ContentType': 'multipart/form-data',
        'Authorization': 'Bearer ' + t
    });

    const httpOptions = {
          headers: headers_object
    };

    return httpOptions;

    } else {

      const headers_object = new HttpHeaders({
        'Authorization': 'Bearer ' + t
    });

    const httpOptions = {
          headers: headers_object
    };

    return httpOptions;
    }

  }


  public getList() {

    const url  = this.vendorurl;

    if (isNullOrUndefined(sessionStorage.getItem('token'))) {
      alert('Session is expired, Please wait a min and then refresh .. ');
      return;
    }

    return this.http.get<Vendor[]>(url, this.getHttpoption());
  }

  public getUserList() {

    const url = this.userurl;

    return this.http.get<User[]>(url, this.getHttpoption());
  }

  public getEntityById(id: string) {

    const url  = this.vendorurl + '/' + id;

    return this.http.get<Vendor>(url, this.getHttpoption());
  }

  public getUser(id: string) {

    const url = this.userurl + '/' + id;

    return this.http.get<User>(url, this.getHttpoption());
  }

  public postEntity(entity: Vendor) {

    const url = this.vendorurl;

    return this.http.post(url, entity, this.getHttpoption());
  }

  public postUser(entity: User) {

    const url = this.userurl;

    return this.http.post(url, entity, this.getHttpoption());
  }

  public updateGPS(entity: Vendor) {

      const url = this.vendorurl + '/' + entity.Id + '/position';
      const corrd = new Gps();
      corrd.Longitude = entity.Longitude;
      corrd.Latitude = entity.Latitude;
      return this.http.patch(url, entity, this.getHttpoption() );

  }

  public addFeature( vendorid: string , feature: Feature) {

    const url = this.vendorurl + '/' + vendorid + '/feature';

    return this.http.post(url, feature, this.getHttpoption());

  }

  public deleteFeature( vendorid: string, featurename: string) {

    const url = this.vendorurl + '/' + vendorid + '/feature/' + featurename;

    return this.http.delete(url, this.getHttpoption());
  }

 public updateEntity( entity: Vendor) {

  const url = this.vendorurl + '/' + entity.Id;

  return this.http.patch(url, entity, this.getHttpoption());

  }

  public updateUser( entity: User) {

    const url = this.userurl + '/' + entity.Id;

    return this.http.patch(url, entity, this.getHttpoption());

    }




 public deleteEntity( id: string) {

    const url = this.vendorurl + '/' + id;

    return this.http.delete(url, this.getHttpoption());
 }

 public deleteUser( id: string) {

  const url = this.userurl + '/' + id;

  return this.http.delete(url, this.getHttpoption());
}

public assignVendor(userId: string, vendorId: string) {

  const url = this.userurl + '/' + userId + '/vendor/'  + vendorId;

  return this.http.patch(url, null, this.getHttpoption());

}

public updatePassword(userId: string, password: string) {

  const url = this.userurl + '/' + userId + '/'  + password;

  return this.http.patch(url, null, this.getHttpoption());

}



 public postImage(vendorId: string , image: FormData) {

  const url = this.vendorurl + '/' + vendorId + '/upload';


    //  // Headers
    //  const headers = new HttpHeaders ({
    //   ContentType: 'multipart/form-data'
    // });


    // return  this.http.post(url, file, {headers: headers});

    return this.http
        .post(
            url,
            image,
            this.getHttpoption(true)
        );

 }

 public removeImage( vendorId: string, imagename: string) {

  const url = this.vendorurl + '/' + vendorId + '/imageUrl/' + imagename;

  return this.http.delete(url, this.getHttpoption());
 }



}
