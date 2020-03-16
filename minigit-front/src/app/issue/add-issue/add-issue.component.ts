import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/services/issue.service';
import { isUndefined } from 'util';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MilestoneService } from 'src/app/services/milestone-services';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent implements OnInit {

  labels;
  users;
  milestones;
  currentUser;
  owner;
  repo;
  issueForm: FormGroup;
  constructor(private issueService : IssueService, private formBuilder: FormBuilder,private milestoneService: MilestoneService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { 
    this.issueForm = this.formBuilder.group({
      'title' : [''],
      'assignees' : [], 
      'labels' : [], 
      'milestone' : ['']
    });
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.repo = params.get("repo");
      this.owner = params.get("user")
    })
    this.issueService.getLabels().subscribe(
      data => {
        this.labels = data;
      }
    )
    this.issueService.getUsers().subscribe(
      data => {
        this.users = data;
       // alert(JSON.stringify(this.users));
      }
    )
    this.milestoneService.getMilestones(this.owner, this.repo).subscribe(
      data => {
        this.milestones = data;
      }
    )
  }

  createIssue(){
    alert(JSON.stringify(this.issueForm.value));
  //  alert(JSON.stringify(this.currentUser));
    
    this.issueService.createIssue(this.issueForm.value, this.currentUser.alias, this.repo).subscribe(
      data => {
        alert(data);
        //redirektujemo na stranicu za prikaz issue-a
        this.router.navigate([this.owner + '/' + this.repo + '/issue'])
      }, error => {
        alert(error.message);
      }
    )
    }
}
