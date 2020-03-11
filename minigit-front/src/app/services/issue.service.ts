import { Injectable } from '@angular/core';
import { SERVER_URL} from '../app.constant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CommentDto } from '../dto/comment.dto';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  headers:{    
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  constructor(private http:HttpClient) { }

  getLabels(){
    return this.http.get(SERVER_URL + 'repos/issues/labels');
  }

  getUsers(){
    return this.http.get(SERVER_URL + 'users');
  }

  createIssue(issue, user, repo):Observable<any>{
    return this.http.post<any>(SERVER_URL + 'repos/'.concat(user).concat('/').concat(repo).concat('/issues/create'), issue, {headers: this.headers});
  }

  getCreateIssues(user){
    return this.http.get(SERVER_URL + 'repos/'.concat(user).concat('/issues/mycreate'));
  }

  getIssue(id){
    return this.http.get(SERVER_URL + 'repos/issue/'.concat(id));
  }

  getIssueEvents(issueId){
    return this.http.get(SERVER_URL + 'repos/issue/'.concat(issueId).concat('/comments'));
  }

  addComment(comment: CommentDto){
    return this.http.post(SERVER_URL + 'repos/comment', comment, {headers: this.headers});
  }
}
