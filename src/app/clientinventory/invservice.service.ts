import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProjectImages, ClientInventory, Inventory, InventoryExtend , ClientInventoryFull, ClinetInfo, InventoryFull, TradeConfirm } from './model/projectinventory';

import { isNullOrUndefined } from 'util';

import { BehaviorSubject } from 'rxjs';

import { ImageLink } from './../core/shared/model/ImageLink';

import { UserInfo, PaymentInfo, PaymentHistory } from '../core/shared/model/userinfo';


@Injectable({
  providedIn: 'root'
})

export class InvserviceService {

    private site = 'https://leecloud.azurewebsites.net/';  // URL to web api

  //  private site = 'https://localhost:44347/';

  // private apim_site = 'https://leecloud.azure-api.net/';

  private url = 'api/articleapi/';

  private postFileurl = 'api/UploadExcelApi/';

  private postPartialFileUrl = 'api/UploadPartialExcelApi/';

  private postUpdateTimeUrl = 'api/ClientInventoryApi/';

  private postCategoryFileurl = 'api/UploadCategoryExcelApi/';

  private postLocationFileurl = 'api/UploadLocationExcelApi/';

  private postTempImageUrl = 'api/UploadTempApi/';

  private getEntityUrl = 'api/ClientInventoryApi/client/';

  private getImagesUrl = 'api/ClientInventoryApi/temp/6';

  private getListUrl = 'api/ClientInventoryApi/';

  private getExtendListUrl = 'api/ClientInventoryExtendApi/';

  private getFullInventoryListUrl = 'api/ClientInventoryExtendApi/GetFullList/888';

  private getFullInventoryEntityUrl = 'api/ClientInventoryExtendApi/GetFullEntity/';

  private getLastUpdateUrl = 'api/ClientInventoryApi/LastUpdate/888';

  private adImagesUrl = 'api/ClientInventoryApi/AdImages/888';

  private adTextLinkUrl = 'api/ClientInventoryApi/AdTextLink/888';

  private paymentGetUrl = 'api/PaymentApi/GetEntity/';

  private paymentPostUrl = 'api/PaymentApi/';

  private paymentGetListUrl = 'api/PaymentApi/';

  private paymentUpdateUsersUrl = 'api/PaymentApi/UpdateUsers/888?mode=excel';

  private paymentUpdateFullInvSubUsersUrl = 'api/PaymentApi/UpdateUsers/888?mode=self';

  private getClientInfoUrl = 'api/ClientInfoApi/';

  private APIM_Key = 'a63b428d457343ba80c4598119dfedc1';

  private _FullInvList = 'api/ClientInventoryFullApi/';

  private _SyncExcelData = 'api/ClientInventoryFullApi/SyncDataFromExcel/888';

  private _ConfirmTradeUrl = 'api/ClientInventoryFullApi/ConfirmTrade/888';  // patch


  _list: ClientInventory[] = [];

  get list(): ClientInventory[] {

    return this._list;

  }

  set list(value: ClientInventory[]) {

    this._list = value;

  }

  paymentInfo: UserInfo<PaymentInfo, PaymentHistory>;

  paymentInfoList: UserInfo<PaymentInfo, PaymentHistory>[];

  extendList: InventoryExtend[];

  inventoryfullList: ClientInventoryFull[];

  private messageSource = new BehaviorSubject<ClientInventory[]>(this.list);

  currentMessage = this.messageSource.asObservable();

  private paymentdataSource = new BehaviorSubject<UserInfo<PaymentInfo, PaymentHistory>>(this.paymentInfo);

  currentPaymentInfo = this.paymentdataSource.asObservable();

  private paymentlistdataSource = new BehaviorSubject<UserInfo<PaymentInfo, PaymentHistory>[]>(this.paymentInfoList);

  currentPaymentList = this.paymentlistdataSource.asObservable();

  private extendlistdataSource = new BehaviorSubject<InventoryExtend[]>(this.extendList);

  currentExtendList = this.extendlistdataSource.asObservable();

  private inventoryfulllistdataSource = new BehaviorSubject<ClientInventoryFull[]>(this.inventoryfullList);

  currentInventoryFullList = this.inventoryfulllistdataSource.asObservable();

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

  changeExtendList(info: InventoryExtend[]) {
    this.extendlistdataSource.next(info);
  }

  changeInventoryFullList(info: ClientInventoryFull[]){
    this.inventoryfulllistdataSource.next(info);
  }



  resetInventoryFullList() {
    this.inventoryfulllistdataSource = null;
  }

  public postFile(file: FormData) {

    const url = this.site + this.postFileurl;

    // Headers
    const headers = new HttpHeaders({
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
    const headers = new HttpHeaders({
      ContentType: 'multipart/form-data'
    });
    return this.http.post<string>(
      url, file, { headers, responseType: 'text' as 'json' }
    );
  }

  public postCategorylFile(file: FormData) {
    const url = this.site + this.postCategoryFileurl;
    const headers = new HttpHeaders({
      ContentType: 'multipart/form-data'
    });
    return this.http.post<string>(
      url, file, { headers, responseType: 'text' as 'json' }
    );
  }

  public postLocationlFile(file: FormData) {
    const url = this.site + this.postLocationFileurl;
    const headers = new HttpHeaders({
      ContentType: 'multipart/form-data'
    });
    return this.http.post<string>(
      url, file, { headers, responseType: 'text' as 'json' }
    );
  }

  public postTempImage(file: FormData) {

    const url = this.site + this.postTempImageUrl;

    // Headers
    const headers = new HttpHeaders({
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

    const url = this.site + this.getEntityUrl + id;

    return this.http.get<ClientInventory>(url);

  }

  public getFullEntityById(id: string, role: string) {
    const url = this.site + this.getFullInventoryEntityUrl + id + '?role=' + role;

   // const url =  this.apim_site + this.getFullInventoryEntityUrl + id + '?role=' + role; // using proxy APIM for Caching

   let headers = new HttpHeaders();

    headers = headers.set('Ocp-Apim-Subscription-Key', this.APIM_Key);


    return this.http.get<ClientInventoryFull>(url, {headers});
  }


  public getList() {

    const url = this.site + this.getListUrl;

    return this.http.get<ClientInventory[]>(url);

  }

  public getExtendList() {

    const url = this.site + this.getExtendListUrl;

    return this.http.get<InventoryExtend[]>(url);

  }

  public getClientInfo(id: string) {

    const url = this.site + this.getClientInfoUrl + id;

    return this.http.get(url);
  }

  public addClientInfo(entity: ClinetInfo) {

    const url = this.site + this.getClientInfoUrl;

    return this.http.post(url, entity);
  }

  public editClientInfo(entity: ClinetInfo) {

    const url = this.site + this.getClientInfoUrl ;

    return this.http.put(url, entity);

  }

  public deleteClientInfo(clientId: string) {

    const url = this.site + this.getClientInfoUrl + clientId ;

    return this.http.delete(url);

  }

  public deleteExtendEntity(id: string) {

    const url = this.site + this.getExtendListUrl + id;

    return this.http.delete(url);

  }

  public addExtendEntity(entity: InventoryExtend) {

    const url = this.site + this.getExtendListUrl;

    return this.http.post(url, entity);

  }

  public editExtendEntity(entity: InventoryExtend) {

    const url = this.site + this.getExtendListUrl;

    return this.http.put(url, entity);
  }

  public getClientFullInvList() {

     const url = this.site + this.getFullInventoryListUrl;

    // const url = this.apim_site + this.getFullInventoryListUrl;

    let headers = new HttpHeaders();

    headers = headers.set('Ocp-Apim-Subscription-Key', this.APIM_Key);

    return this.http.get<ClientInventoryFull[]>(url, {headers});

  }

  public _getClientFullList() {

      const url = this.site + this._FullInvList;

      return this.http.get<ClientInventoryFull[]>(url);

  }

  public _getClientFullEntity(id: string) {

    const url = this.site + this._FullInvList + '?id=' + id;

    return this.http.get<ClientInventoryFull>(url);

}

  public _addFullInvEntity(entity: InventoryFull, id: string) {

    const url = this.site + this._FullInvList + '?id=' + id;

    return this.http.post(url, entity);
  }

  public _updateFullInvEntity(entity: InventoryFull, id: string) {

    const url = this.site + this._FullInvList + '/' + id;

    return this.http.put(url, entity);

  }

  public _deleteFullInvEntity(id: string, prodid: string) {

    const url = this.site + this._FullInvList + '/' + id + '?prodid=' + prodid;

    return this.http.delete(url);

  }

  public _tradeConfirm(info: TradeConfirm) {

    const url = this.site + this._ConfirmTradeUrl;

    return this.http.patch(url, info);
  }

  public getImages() {

    const url = this.site + this.getImagesUrl;

    return this.http.get<ProjectImages[]>(url);
  }

  public updateTime() {

    const url = this.site + this.postUpdateTimeUrl;

    const datestring = new Date().toLocaleString();

    return this.http.put<object>(url, { 'date': datestring });
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
    const headers = new HttpHeaders({
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

  public updatePaymentUserFullInvSub() {

    const url = this.site + this.paymentUpdateFullInvSubUsersUrl;

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

  public _syncExcelData() {

    const url = this.site + this._SyncExcelData;

    return this.http.get(url);

  }

  public postAdTextLinks(adimages: ImageLink[]) {

    const url = this.site + this.adTextLinkUrl;

    // Headers
    const headers = new HttpHeaders({
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
