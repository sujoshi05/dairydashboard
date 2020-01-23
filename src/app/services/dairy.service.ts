
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class DairyService {
    constructor(private http: HttpClient) {

    }
    postData(url, data) {
        return this.http.post(environment.dairyService + url, data);
    }

    getData(url) {
        return this.http.get(environment.dairyService + url);
    }

    putData(url, data) {
        return this.http.put(environment.dairyService + url, data);
    }

}
