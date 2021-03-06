import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';


import { Vendor, Gps, Feature, User, Gps_poco, Vendor_poco, Feature_poco, User_poco } from '../model/Inhub';
import { isNullOrUndefined } from 'util';
import {InHubLog} from './../../core/shared/model/log';
import {Router} from '@angular/router';


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

  private logurl = this.site + 'api/logapi/';



  constructor(
    private http: HttpClient , private router: Router
  ) {  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  public gettoken() {

    return this.http.get(this.tokenurl, {responseType: 'text'});
  }


  public getHttpoption(isImage: boolean = false) {

    if (isNullOrUndefined(sessionStorage.getItem('token'))) {
      alert('Session Expired or Unauthorized , 請登入');
      this.router.navigate(['bclogin']);
      return;
    }

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

    if (isNullOrUndefined(sessionStorage.getItem('token'))) {
      alert('Session Expired or Unauthorized , 請登入');
      this.router.navigate(['bclogin']);
      return;
    }

    const url  = this.vendorurl;

    return this.http.get<Vendor[]>(url, this.getHttpoption());
  }

  public getUserList() {

    if (isNullOrUndefined(sessionStorage.getItem('token'))) {
      alert('Session Expired or Unauthorized , 請登入');
      this.router.navigate(['bclogin']);
      return;
    }
    const url = this.userurl;

    return this.http.get<User[]>(url, this.getHttpoption());
  }

  public getLogs() {

    const url = this.logurl;

    return this.http.get<InHubLog[]>(url);
  }

  public getEntityById(id: string) {

    const url  = this.vendorurl + '/' + id;

    return this.http.get<Vendor>(url, this.getHttpoption());
  }

  public getUser(id: string) {

    const url = this.userurl + '/' + id;

    return this.http.get<User>(url, this.getHttpoption());
  }

  public postEntity(entity: Vendor_poco) {

    const url = this.vendorurl;

    return this.http.post(url, entity, this.getHttpoption());
  }

  public postUser(entity: User_poco) {

    const url = this.userurl;

    return this.http.post(url, entity, this.getHttpoption());
  }

  public updateGPS(entity: Vendor) {

      const url = this.vendorurl + '/' + entity._id + '/position';
      const corrd = new Gps_poco();
      corrd.Longitude = entity.longitude;
      corrd.Latitude = entity.latitude;
      return this.http.patch(url, corrd, this.getHttpoption() );

  }

  public addFeature( vendorid: string , feature: Feature) {

    const url = this.vendorurl + '/' + vendorid + '/feature';

    const featurepoco = new Feature_poco;
    featurepoco.Type = feature.type;
    featurepoco.Name = feature.name;
    featurepoco.Name_en = feature.name_en;
    featurepoco.Image_Url = feature.image_url;
    featurepoco.Checked = feature.checked;

    // alert(featurepoco.Name);

    return this.http.post(url, featurepoco, this.getHttpoption());

  }

  public deleteFeature( vendorid: string, featurename: string) {

    const url = this.vendorurl + '/' + vendorid + '/feature/' + featurename;

    return this.http.delete(url, this.getHttpoption());
  }

 public updateEntity( entity: Vendor_poco) {

  const url = this.vendorurl + '/' + entity.Id;

  return this.http.patch(url, entity, this.getHttpoption());

  }

  public updateUser( entity: User_poco) {

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
