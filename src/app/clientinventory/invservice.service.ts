import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import {ProjectImages , ClientInventory, Inventory} from './model/projectinventory';


@Injectable({
  providedIn: 'root'
})

export class InvserviceService {

  private site = 'https://leecloud.azurewebsites.net/';  // URL to web api

  // private site = 'https://localhost:44347/';

  private url = 'api/articleapi/';

  private postFileurl = 'api/UploadExcelApi/';

  private postTempImageUrl = 'api/UploadTempApi/';

  private getEntityUrl = 'api/ClientInventoryApi/client/';

  private getImagesUrl = 'api/ClientInventoryApi/temp/6';

  private getListUrl = 'api/ClientInventoryApi/';


  constructor(
    private http: HttpClient
  ) { }

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

  const url  = this.site + this.getEntityUrl;

  return this.http.get<ClientInventory[]>(url);
}

public getImages() {

  const url  = this.site + this.getImagesUrl ;

  return this.http.get<ProjectImages[]>(url);
}

}
