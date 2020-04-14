import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/services/issue.service';
import { ActivatedRoute } from '@angular/router';
import { MilestoneService } from 'src/app/services/milestone-services';

@Component({
  selector: 'app-show-issue-milestone',
  templateUrl: './show-issue-milestone.component.html',
  styleUrls: ['./show-issue-milestone.component.css']
})
export class ShowIssueMilestoneComponent implements OnInit {

  repo;
  owner;
  issues;
  openIssues = [];
  closedIssues = [];
  clickOpen= true;
  clickClose = false;
  milestonesIssues = [];
  milestones : any;
  id:any;

  constructor(private issueService: IssueService, private route: ActivatedRoute, private milestoneService: MilestoneService) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.repo = params.get("repo");
      this.owner = params.get("owner");
      this.id = params.get("id")
      this.issueService.getIssues(this.owner, this.repo).subscribe(
        data => {
          this.issues = data;
          this.issues.forEach(element => {
            if(element.fields.milestone == this.id){
              console.log(this.milestonesIssues)
              if (element.fields.state === 'OPEN'){
                this.openIssues.push(element);
              }else {
                this.closedIssues.push(element);
              }
            }
          });
          this.milestonesIssues = this.openIssues;
        }
      );
      this.milestoneService.getMilestones(this.owner, this.repo).subscribe(
        data => this.milestones = data
      )
    });
    

  }

  openIssue(){
    this.clickOpen = true;
    this.clickClose = false;
    this.milestonesIssues = this.openIssues;
   
  }

  closedIssue(){
    this.clickClose = true;
    this.clickOpen = false;
    this.milestonesIssues = this.closedIssues;
    
  }

}
