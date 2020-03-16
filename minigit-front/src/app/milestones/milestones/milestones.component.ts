import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MilestoneService } from 'src/app/services/milestone-services';
import { SERVER_URL, SERVER_URL_FRONT } from 'src/app/app.constant';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.css']
})
export class MilestonesComponent implements OnInit {

  owner : any;
  repo : any;
  milestones: any;
  open: number = 0;
  closed: number = 0;
  percent: number = 0;
  closeClick = false;
  openClick = true;
  openMilestones= [];
  closeMilestones = [];
  

  constructor(
    private service:MilestoneService,
    private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
          this.owner = params.get('owner');
          this.repo = params.get('repo');
  
  
          this.service.getMilestones(this.owner,this.repo).subscribe(
            data => {
                    this.milestones = data;
                    this.milestones.forEach(element => {
                      
                      if(element.fields.state == "OPEN"){
                        this.openMilestones.push(element);
                      }
                      else{
                        this.closeMilestones.push(element);
                      }
                        
                    });
                    this.milestones = this.openMilestones;

          });
          
      });
  }


  clickOpen(){
    this.openClick = true;
    this.closeClick = false;
    this.milestones = this.openMilestones;
  }

  clickClose(){
    this.openClick = false;
    this.closeClick = true;
    this.milestones = this.closeMilestones;
  }

  newMilestone(){
    window.location.href = SERVER_URL_FRONT +  this.owner + "/" + this.repo + "/milestones/create";
  }

  close(pk:any){
    this.service.closeMilestones(pk).subscribe(
      data => {
        window.location.reload();
    },
    (err) => {
      });
  }

  delete(pk:any){
    this.service.deleteMilestones(pk).subscribe(
      data => {
        window.location.reload();
    },
    (err) => {
      });
  }

  update(pk:any){
    window.location.href = SERVER_URL_FRONT +  this.owner + "/" + this.repo + "/milestones/update/" + pk;
  }

}
