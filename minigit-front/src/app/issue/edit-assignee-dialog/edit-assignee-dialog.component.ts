import { Component, OnInit, Inject } from '@angular/core';
import { IssueService } from 'src/app/services/issue.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-assignee-dialog',
  templateUrl: './edit-assignee-dialog.component.html',
  styleUrls: ['./edit-assignee-dialog.component.css']
})
export class EditAssigneeDialogComponent implements OnInit {

  users;
  assignees;
  usersForDialog = [];
  newAssignees;
  issueId;
  currentUser;

  constructor(
    private issueService: IssueService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.assignees = this.data["assignees"];
    this.issueId = this.data["issueId"];
    this.currentUser = this.data["currentUser"];
    this.issueService.getUsers().subscribe(
      data => {
        this.users = data;
        this.users.forEach(user => {
          let assigned = false;
          this.assignees.forEach(assignee => {
            if (user.pk==assignee.pk){
              assigned = true;
            }
          });
          if (!assigned) {
            this.usersForDialog.push(user);
          }
        });
      }
    )
  }

  saveAssignee() {
    this.issueService.addAssignees(this.issueId, this.newAssignees, this.currentUser.alias).subscribe(res => {
      console.log('saved assignee');
    })
  }

  close() {
    console.log('close');
  }

}
