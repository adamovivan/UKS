import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from 'src/app/services/issue.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-show-issues',
  templateUrl: './show-issues.component.html',
  styleUrls: ['./show-issues.component.css']
})
export class ShowIssuesComponent implements OnInit {
  currentUser;
  showIssuesOpen = [];
  showIssuesClosed = [];
  showIssues = []
  clickOpen= true;
  clickClose = false;

  constructor( private issueService: IssueService, private authService: AuthService, private route: ActivatedRoute) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {

    this.issueService.getCreateIssues(this.currentUser.alias).subscribe(
      data => {
        console.log(data)
       

        for(let issue of data){
          if(issue.fields.state === 'OPEN'){
            this.showIssuesOpen.push(issue);
          }
          else{
            this.showIssuesClosed.push(issue);
          }
        }

        this.showIssues = this.showIssuesOpen;
      }
    )
  }

  openIssue(){
    this.clickOpen = true;
    this.clickClose = false;
    this.showIssues = this.showIssuesOpen;
   
  }

  closedIssue(){
    this.clickClose = true;
    this.clickOpen = false;
    this.showIssues = this.showIssuesClosed;
    
  }
}
