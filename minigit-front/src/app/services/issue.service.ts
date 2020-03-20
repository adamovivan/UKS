import { Injectable } from '@angular/core';
import { SERVER_URL} from '../app.constant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentDto } from '../dto/comment.dto';
import { CommentEditDto } from '../dto/comment-edit.dto';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  headers:{    
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  constructor(private http:HttpClient) { }

  getIssues(owner, repo){
    return this.http.get(SERVER_URL+ 'repos/repos/'.concat(owner).concat('/'.concat(repo).concat('/issues')));
  }

  getLabels(){
    return this.http.get(SERVER_URL + 'repos/issues/labels');
  }

  getUsers(){
    return this.http.get(SERVER_URL + 'users');
  }

  createIssue(issue, owner, repo):Observable<string>{
    return this.http.post(SERVER_URL + 'repos/'.concat(owner).concat('/').concat(repo).concat('/issues/create'), issue, {headers: this.headers, responseType: 'text'});
  }

  getCreateIssues(user): Observable<any> {
    return this.http.get(SERVER_URL + 'repos/'.concat(user).concat('/issues/mycreate'));
  }

  getIssue(id){
    return this.http.get(SERVER_URL + 'repos/issue-id/'.concat(id));
  }

  getIssueComments(issueId){
    return this.http.get(SERVER_URL + 'repos/issue/'.concat(issueId).concat('/comments'));
  }

  addComment(comment: CommentDto){
    return this.http.post(SERVER_URL + 'repos/comment', comment);
  }

  editComment(commentEdit: CommentEditDto){
    return this.http.post(SERVER_URL + 'repos/comment/edit', commentEdit);
  }

  getCommentChanges(commentId){
    return this.http.get(SERVER_URL + 'repos/comment/changes/'.concat(commentId));
  }

  changeState(issueId, userAlias){
    return this.http.put(SERVER_URL + 'repos/issue/change/state/'.concat(issueId).concat('/').concat(userAlias), {});
  }

  getStateChanges(issueId){
    return this.http.get(SERVER_URL + 'repos/issue/state/changes/'.concat(issueId));
  }

  getIssueEvents(issueId){
    return this.http.get(SERVER_URL + 'repos/issue-events/'.concat(issueId));
  }

  getAssignees(assigneesIds) {
    return this.http.post(SERVER_URL + 'repos/issue-assignees', assigneesIds);
  }

  getIssueLabels(labelsIds) {
    return this.http.post(SERVER_URL + 'repos/issue-labels', labelsIds);
  }

  getIssueMilestone(milestoneId) {
    return this.http.post(SERVER_URL + 'repos/issue-milestone', milestoneId);
  }
}
