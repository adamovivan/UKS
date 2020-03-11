import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/services/issue.service';
import { isUndefined } from 'util';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent implements OnInit {

  labels;
  users;
  currentUser;
  issueForm: FormGroup;
  constructor(private issueService : IssueService, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.issueForm = this.formBuilder.group({
      'title' : [''],
      'assignees' : [], 
      'labels' : [], 
      'milestone' : ['']
    });
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
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
  }

  createIssue(){
    alert(JSON.stringify(this.issueForm.value));
    var repo = 'upp_nc';
  //  alert(JSON.stringify(this.currentUser));
    
    this.issueService.createIssue(this.issueForm.value, this.currentUser.alias, repo).subscribe(
      data => {
        alert("Success create issue");
        alert(data);
        //redirektujemo na stranicu za prikaz issue-a
      }, error => {
        
        if (error.status == 201) {
          alert("Success create issue");
          this.router.navigate(['issues']);
        }else {
          alert("Unsuccess create issue");
        }
      }
    )
    }
}
