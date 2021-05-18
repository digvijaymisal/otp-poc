import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataLayerService {

  constructor(private http: HttpClient) { }

  dummyUrl = 'https://jsonplaceholder.typicode.com/todos/1';

  getDummyResponse() {
    return this.http.get(this.dummyUrl);
  }


}
