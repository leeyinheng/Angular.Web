import {Injectable} from '@angular/core'; 
import {HttpClient} from '@angular/common/http'; 
import {Observable} from 'rxjs/Rx';

import {weight} from './../weight'; 


@Injectable()
export class UploadWeightService{

    url:string = "https://localhost:44347/api/addweight"; 

    constructor(private http: HttpClient){

    }

    PostWeight(w: weight): Observable<object>{

        return this.http.put(this.url, w);

    }
}
