import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from 'src/app/services/issue.service';
import { MilestoneService } from 'src/app/services/milestone-services';

@Component({
  selector: 'app-show-issue-repo',
  templateUrl: './show-issue-repo.component.html',
  styleUrls: ['./show-issue-repo.component.css']
})
export class ShowIssueRepoComponent implements OnInit {

  repo;
  owner;
  issues;
  openIssues = [];
  closedIssues = [];
  clickOpen= true;
  clickClose = false;
  milestones;

  constructor(private issueService: IssueService, private route: ActivatedRoute, private milestoneService: MilestoneService) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.repo = params.get("repo");
      this.owner = params.get("owner");
      this.issueService.getIssues(this.owner, this.repo).subscribe(
        data => {
          this.issues = data;
          this.issues.forEach(element => {
            if (element.fields.state === 'OPEN'){
              this.openIssues.push(element);
            }else {
              this.closedIssues.push(element);
            }
          });
          this.issues = this.openIssues;
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
    this.issues = this.openIssues;
   
  }

  closedIssue(){
    this.clickClose = true;
    this.clickOpen = false;
    this.issues = this.closedIssues;
    
  }



}
