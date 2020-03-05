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
  
  addMilestones(owner,repo, data){
    return this.http.post(SERVER_URL + 'repos/'+owner+'/'+repo+'/milestones/create',data);
  }
}