import { Injectable } from '@angular/core';
import { SERVER_URL} from '../app.constant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  constructor(private http:HttpClient){

  }

  getMilestones(owner,repo){
    return this.http.get(SERVER_URL + 'repos/'+owner+'/'+repo+'/milestones');
  }
  
  addMilestones(owner,repo, data): Observable<string>{
    return this.http.post(SERVER_URL + 'repos/'+owner+'/'+repo+'/milestones/create',data,{responseType:'text'});
  }

  closeMilestones(id): Observable<string>{
    return this.http.patch(SERVER_URL + 'repos/milestones/close/' + id,{},{responseType:'text'});
  }

  deleteMilestones(id): Observable<string>{
    return this.http.delete(SERVER_URL + 'repos/milestones/delete/' + id,{responseType:'text'});
  }

}