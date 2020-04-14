import { Component, OnInit } from '@angular/core';
import { MilestoneService } from 'src/app/services/milestone-services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SERVER_URL_FRONT } from 'src/app/app.constant';

@Component({
  selector: 'app-milestones-update',
  templateUrl: './milestones-update.component.html',
  styleUrls: ['./milestones-update.component.css']
})
export class MilestonesUpdateComponent implements OnInit {

  SingIn:FormGroup;
  submitted = false;
  milestone: any;
  milestoneU: any;
  owner:any;
  repo:any;
  pk:any;

  constructor(
    private service:MilestoneService,
    private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.activatedRoute.paramMap.subscribe(
        params => {
            this.owner = params.get('owner');
            this.repo = params.get('repo');
            this.pk = params.get('id');
        });
        
      this.service.getMilestone(this.pk).subscribe(
        data => {
          this.milestoneU = data;
          if(this.milestoneU.length == 0){
            this.SingIn = this.formBuilder.group({
              title:["",Validators.compose([Validators.required, Validators.pattern('[a-zA-Z 0-9]+')])],
              dueData:["",Validators.required],
              description:["",Validators.compose([Validators.required, Validators.pattern('[a-zA-Z 0-9!]+')])],
      
            });
          }else{
            this.SingIn = this.formBuilder.group({
              title:[this.milestoneU[0].fields.title,Validators.compose([Validators.required, Validators.pattern('[a-zA-Z 0-9]+')])],
              dueData:[this.milestoneU[0].fields.due_date,Validators.required],
              description:[this.milestoneU[0].fields.description,Validators.compose([Validators.required, Validators.pattern('[a-zA-Z 0-9!]+')])],
      
            });
          }
          
      });
      
      
  }

  get f() { return this.SingIn.controls; }

  onSubmit(event:any) {
    this.submitted = true;
    this.milestone = this.SingIn.getRawValue();
    console.log(this.milestone)
    this.service.updateMilestones(this.pk,this.milestone).subscribe(
      data => {
        window.location.href = SERVER_URL_FRONT + this.owner + "/" + this.repo + "/milestones";
    });
  }

}
