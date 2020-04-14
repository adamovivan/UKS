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
    return this.http.get(SERVER_URL + 'repos/repos/' + owner + '/' + repo) ;
  }

  getCommitsBranch(owner,repo,pk){
    return this.http.get(SERVER_URL + 'repos/repos/' + owner + '/' + repo + '/commits?sha=' + pk);
  }

  getReadme(owner,repo){
    return this.http.get(SERVER_URL + 'repos/repos/' + owner + '/' + repo + '/readme');
  }

  getContentsBranch(owner,repo, pk){
    return this.http.get(SERVER_URL + 'repos/repos/' + owner + '/' + repo + '/contents?ref=' + pk);
  }

  postContent(owner,repo,path){
    return this.http.post(SERVER_URL + 'repos/repos/' + owner + '/' + repo + '/content' , {"path":path});
  }

  getBranches(owner,repo){
    return this.http.get(SERVER_URL + 'repos/repos/' + owner + '/' + repo + '/branches');
  }
}
