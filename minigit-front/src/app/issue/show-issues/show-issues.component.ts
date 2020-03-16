import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from 'src/app/services/issue.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-show-issues',
  templateUrl: './show-issues.component.html',
  styleUrls: ['./show-issues.component.css']
})
export class ShowIssuesComponent implements OnInit {
  currentUser;
  showIssues;
  constructor( private issueService: IssueService, private authService: AuthService) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.issueService.getCreateIssues(this.currentUser.alias).subscribe(
      data => {
        console.log(data)
        this.showIssues = data;
      }
    )
  }
}
