import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptserviceService {

  private  secretKey: string = "TeaProjectByHenryLee";

  private encrptforteaprojectmanger: string = 'teaprojectmanager';

  private encryptforteaprojectuser: string = 'teaprojectuser';

  constructor() { }

  public GetTeaProjectManagerKey(id: string){
    return this.encrypt(this.encrptforteaprojectmanger);
  }

  public GetTeaProejctUserKey(id: string){
    return this.encrypt(this.encryptforteaprojectuser);
  }

  public GetStaticManagerKey(){
    return 'U2FsdGVkX180WP4SwrJlPeC51zC%2FQeuJjrBUtxbTFn%2Ft3jRUBxMXlonClKWTr5AH';
  }

  public GetStaticUserKey(){
    return 'U2FsdGVkX18spRjcQHHu%2F%2FqckOxgT72GNyMwX1PnJG4%3D';
  }

  public IdentifyTeaProejctLogIn(value: string){
  
    const keystring: string = this.decrypt(value); 

    //alert(keystring);
    
    //const key = keystring.split('||')[1];
    
    const key = keystring;

    switch (key){
      case this.encrptforteaprojectmanger.trim().toString(): {
        return 'manager';
      }
      case this.encryptforteaprojectuser.trim().toString(): {
        return 'user'
      }
      default: {
        return 'not allow'
      }
    }
  }

  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
   
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
