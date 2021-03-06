import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css']
})
export class CommitComponent implements OnInit {

  owner : any;
  repo : any;
  commits: any;
  open: number = 0;
  closed: number = 0;
  percent: number = 0;
  branches:any;

  constructor(
    private service: RepositoryService,
    private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
          this.owner = params.get('owner');
          this.repo = params.get('repo');
  
          this.service.getCommitsBranch(this.owner,this.repo,"master").subscribe(
            data => {
                   this.commits = data
          });
          this.service.getBranches(this.owner,this.repo).subscribe(
            data => {
                   this.branches = data
          });
      });
  }

  branch(pk){
    this.service.getCommitsBranch(this.owner,this.repo,pk).subscribe(
      data => {
             this.commits = data
    });
  }

}
