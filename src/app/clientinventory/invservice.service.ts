import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class InvserviceService {

  // private site = 'https://leecloud.azurewebsites.net/';  // URL to web api

  private site = 'https://localhost:44347/';

  private url = 'api/articleapi/';

  private postFileurl = 'api/UploadExcelApi/';

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


}
