import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { RepositoryService } from 'src/app/services/repository.service';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-repo-show',
  templateUrl: './repo-show.component.html',
  styleUrls: ['./repo-show.component.css']
})
export class RepoShowComponent implements OnInit {

  
  repo = '';
  owner = '';
  repository:any;
  commits:any;
  commitsNumber:any = 0;
  readme:any;
  contents:any;
  issues:any;

  constructor(
    private service: RepositoryService,
    private issueService: IssueService,
    private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
          this.owner = params.get('owner');
          this.repo = params.get('repo');
          this.issueService.getIssues(this.owner, this.repo).subscribe(
            data => this.issues = data
          )
  
          this.service.getRepo(this.owner,this.repo).subscribe(
            data => {
                   this.repository = data
          });
          this.service.getCommits(this.owner,this.repo).subscribe(
            data => {
                   this.commits = data
                   this.commits.forEach(element => {
                     this.commitsNumber += 1;
                   });
          });
          
          this.service.getReadme(this.owner,this.repo).subscribe(
            data => {
                   this.readme = data
          });

          this.service.getContents(this.owner,this.repo).subscribe(
            data => {
                   this.contents = data
          });
      });
  }

  podaci(path){
    this.service.postContent(this.owner,this.repo,path).subscribe(
      data => {
             this.contents = data
    });
  }

}
