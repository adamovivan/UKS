import { Injectable } from '@angular/core';
import { SERVER_URL} from '../app.constant';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http:HttpClient) { }

  getLabels(){
    return this.http.get(SERVER_URL + 'repos/issues/labels');
  }
}
