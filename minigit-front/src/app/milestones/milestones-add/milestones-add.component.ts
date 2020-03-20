import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MilestoneService } from 'src/app/services/milestone-services';
import { SERVER_URL, SERVER_URL_FRONT } from 'src/app/app.constant';

@Component({
  selector: 'app-milestones-add',
  templateUrl: './milestones-add.component.html',
  styleUrls: ['./milestones-add.component.css']
})
export class MilestonesAddComponent implements OnInit {

  SingIn:FormGroup;
  submitted = false;
  milestone: any;
  owner:any;
  repo:any;

  constructor(
    private service:MilestoneService,
    private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.SingIn = this.formBuilder.group({
        title:['',Validators.compose([Validators.required, Validators.pattern('[a-zA-Z 0-9]+')])],
        dueData:['',Validators.required],
        description:['',Validators.compose([Validators.required, Validators.pattern('[a-zA-Z 0-9!]+')])],

      });
      this.activatedRoute.paramMap.subscribe(
        params => {
            this.owner = params.get('owner');
            this.repo = params.get('repo');
        });
  }

  get f() { return this.SingIn.controls; }

  onSubmit(event:any) {
    this.submitted = true;
    this.milestone = this.SingIn.getRawValue();
    console.log(this.milestone)
    this.service.addMilestones(this.owner,this.repo,this.milestone).subscribe(
      data => {
        window.location.href = SERVER_URL_FRONT + this.owner + "/" + this.repo + "/milestones";
    });
  }

}
