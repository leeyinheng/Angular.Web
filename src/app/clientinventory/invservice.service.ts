import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import {ProjectImages , ClientInventory, Inventory} from './model/projectinventory';

import { isNullOrUndefined } from 'util';

import { BehaviorSubject } from 'rxjs';

import {ImageLink} from './../core/shared/model/ImageLink';

import { UserInfo, PaymentInfo , PaymentHistory } from '../core/shared/model/userinfo';


@Injectable({
  providedIn: 'root'
})

export class InvserviceService {

  private site = 'https://leecloud.azurewebsites.net/';  // URL to web api

  // private site = 'https://localhost:44347/';

  private url = 'api/articleapi/';

  private postFileurl = 'api/UploadExcelApi/';

  private postPartialFileUrl = 'api/UploadPartialExcelApi/';

  private postUpdateTimeUrl = 'api/ClientInventoryApi/';

  private postTempImageUrl = 'api/UploadTempApi/';

  private getEntityUrl = 'api/ClientInventoryApi/client/';

  private getImagesUrl = 'api/ClientInventoryApi/temp/6';

  private getListUrl = 'api/ClientInventoryApi/';

  private getLastUpdateUrl = 'api/ClientInventoryApi/LastUpdate/888';

  private adImagesUrl = 'api/ClientInventoryApi/AdImages/888';

  private adTextLinkUrl = 'api/ClientInventoryApi/AdTextLink/888';

  private paymentGetUrl = 'api/PaymentApi/GetEntity/';

  private paymentPostUrl = 'api/PaymentApi/';

  private paymentGetListUrl = 'api/PaymentApi/';

  private paymentUpdateUsersUrl = 'api/PaymentApi/UpdateUsers/888';




  _list: ClientInventory[] = [];

  get list(): ClientInventory[] {

      return this._list;

  }

  set list( value: ClientInventory[]) {

      this._list = value;

  }

  paymentInfo: UserInfo<PaymentInfo, PaymentHistory>;

  paymentInfoList:  UserInfo<PaymentInfo, PaymentHistory>[];


  private messageSource = new BehaviorSubject<ClientInventory[]>(this.list);

  currentMessage = this.messageSource.asObservable();

  private paymentdataSource = new BehaviorSubject<UserInfo<PaymentInfo, PaymentHistory>>(this.paymentInfo);

  currentPaymentInfo = this.paymentdataSource.asObservable();

  private paymentlistdataSource = new BehaviorSubject<UserInfo<PaymentInfo, PaymentHistory>[]>(this.paymentInfoList);

  currentPaymentList = this.paymentlistdataSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  changeMessage(message: ClientInventory[]) {
    this.messageSource.next(message);
  }

  changePaymentInfo(info: UserInfo<PaymentInfo, PaymentHistory>) {
    this.paymentdataSource.next(info);
  }

  changePaymentInfoList(info: UserInfo<PaymentInfo, PaymentHistory>[]) {
    this.paymentlistdataSource.next(info);
  }

   public postFile(file: FormData) {

    const url = this.site + this.postFileurl;

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

  public postPartialFile(file: FormData) {
    const url = this.site + this.postPartialFileUrl;
    const headers = new HttpHeaders ({
      ContentType: 'multipart/form-data'
    });
    return this.http.post<string>(
      url, file , {headers, responseType: 'text' as 'json'}
    );
  }

 public postTempImage(file: FormData) {

  const url = this.site + this.postTempImageUrl;

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

public getEntityById(id: string) {

    const url  = this.site + this.getEntityUrl + id;

    return this.http.get<ClientInventory>(url);

}


public getList() {

  const url  = this.site + this.getListUrl;

  return this.http.get<ClientInventory[]>(url);

}

public getImages() {

  const url  = this.site + this.getImagesUrl ;

  return this.http.get<ProjectImages[]>(url);
}

public updateTime() {

  const url = this.site + this.postUpdateTimeUrl;

  const datestring = new Date().toLocaleString();

  return this.http.put<object>(url, {'date': datestring} );
}

public getLastUpdateTime() {

  const url = this.site + this.getLastUpdateUrl;

  return this.http.get(url);

}

public getAdImages() {

  const url = this.site + this.adImagesUrl;

  return this.http.get<ImageLink[]>(url);
}

public postAdImages(adimages: ImageLink[]) {

  const url = this.site + this.adImagesUrl;

   // Headers
   const headers = new HttpHeaders ({
    ContentType: 'multipart/form-data'
  });


  // return  this.http.post(url, file, {headers: headers});

  return this.http
      .post<string>(
          url,
          adimages,
      { headers, responseType: 'text' as 'json' }
      );
}

public getAdTextLinks() {

  const url = this.site + this.adTextLinkUrl;

  return this.http.get<ImageLink[]>(url);
}

public getPaymentEntity(id: string) {

  const url = this.site + this.paymentGetUrl + id;

  return this.http.get<UserInfo<PaymentInfo, PaymentHistory>>(url);

}

public updatePaymentUsers() {

  const url = this.site + this.paymentUpdateUsersUrl;

  return this.http.get(url);

}

public postPaymentEntity(entity: UserInfo<PaymentInfo, PaymentHistory>) {

   const url = this.site + this.paymentPostUrl;

   return this.http
   .post<UserInfo<PaymentInfo, PaymentHistory>>(
       url,
       entity,
    { responseType: 'text' as 'json' }
   );

}

public getPaymentList() {
  const url = this.site + this.paymentGetListUrl;
  return this.http.get<UserInfo<PaymentInfo, PaymentHistory>[]>(url);
}

public postAdTextLinks(adimages: ImageLink[]) {

  const url = this.site + this.adTextLinkUrl;

   // Headers
   const headers = new HttpHeaders ({
    ContentType: 'multipart/form-data'
  });


  // return  this.http.post(url, file, {headers: headers});

  return this.http
      .post<string>(
          url,
          adimages,
      { headers, responseType: 'text' as 'json' }
      );
}


}
