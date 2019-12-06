import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptserviceService {

  private  secretKey: string = "TeaProjectByHenryLee";

   
  constructor() { }


  encrypt(value : string) : string{

    const encstring = CryptoJS.AES.encrypt(value, this.secretKey).toString();
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encstring));
  }

  decrypt(textToDecrypt : string){
   
    const decData = CryptoJS.enc.Base64.parse(textToDecrypt).toString(CryptoJS.enc.Utf8);

    return CryptoJS.AES.decrypt(decData, this.secretKey).toString(CryptoJS.enc.Utf8);
  }
}
