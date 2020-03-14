import { Injectable } from '@angular/core';
import { SERVER_URL} from '../app.constant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor(private http:HttpClient){

  }

  getCommits(owner,repo){
    return this.http.get(SERVER_URL + 'repos/' + owner + '/' + repo + '/commits');
  }


}