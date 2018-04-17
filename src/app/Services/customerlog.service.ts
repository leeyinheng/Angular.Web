import {Injectable} from '@angular/core'; 
import {HttpClient, HttpHeaders} from '@angular/common/http'; 
import {Observable} from 'rxjs/Rx';

import {customerlog} from './../customerlog'; 

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }), 
    params : null, 
    withCredentials: false 
}; 

@Injectable()
export class CustomerlogService{

    
    
    url:string = "https://localhost:44347/api/CustomerLogApi/"; 

   

    constructor(private http: HttpClient){

    }

    PostCustomerLog(c: customerlog): Observable<object>{

                        
        return this.http.post(this.url, c, httpOptions); 
      

    }

    GetAllCustomerLog(): Observable<customerlog[]>{

        return this.http.get<customerlog[]>(this.url); 
    }

    DeleteCustomerLog(rowkey:string)
    {
        return this.http.delete(this.url + rowkey); 
    }
}