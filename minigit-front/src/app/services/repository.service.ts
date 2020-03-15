import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../app.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }

  getRepositories(username):Observable<any>{
    return this.http.get(SERVER_URL + 'users/'.concat(username).concat('/repos')) ;
  }

  getRepo(owner,repo):Observable<any>{
    return this.http.get(SERVER_URL + 'repos/' + owner + '/' + repo) ;
  }


  getCommits(owner,repo){
    return this.http.get(SERVER_URL + 'repos/' + owner + '/' + repo + '/commits');
  }

  getReadme(owner,repo){
    return this.http.get(SERVER_URL + 'repos/' + owner + '/' + repo + '/readme');
  }

  getContents(owner,repo){
    return this.http.get(SERVER_URL + 'repos/' + owner + '/' + repo + '/contents');
  }

}
