import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-repo-show',
  templateUrl: './repo-show.component.html',
  styleUrls: ['./repo-show.component.css']
})
export class RepoShowComponent implements OnInit {
  repo = '';
  owner = '';
  issues;

  constructor(private route: ActivatedRoute, private issueService: IssueService) { }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.repo = params.get("repo");
      this.owner = params.get("owner");
      this.issueService.getIssues(this.owner, this.repo).subscribe(
        data => this.issues = data
      )
    })
  }

}
