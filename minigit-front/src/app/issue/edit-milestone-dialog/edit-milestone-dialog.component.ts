import { Component, OnInit, Inject } from '@angular/core';
import { IssueService } from 'src/app/services/issue.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MilestoneService } from 'src/app/services/milestone-services';

@Component({
  selector: 'app-edit-milestone-dialog',
  templateUrl: './edit-milestone-dialog.component.html',
  styleUrls: ['./edit-milestone-dialog.component.css']
})
export class EditMilestoneDialogComponent implements OnInit {

  milestones;
  chosenMilestone;
  milestonesForDialog = [];
  newMilestone;
  issueId;
  currentUser;
  projectId;

  constructor(
    private issueService: IssueService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.chosenMilestone = this.data["milestone"];
    this.issueId = this.data["issueId"];
    this.currentUser = this.data["currentUser"];
    this.projectId = this.data["projectId"];
    this.issueService.getProjectMilestones(this.projectId).subscribe(
      data => {
        this.milestones = data;
        this.milestones.forEach(milestone => {
          let chosen = false;
          if (this.chosenMilestone != null && this.chosenMilestone.pk == milestone.pk) {
            chosen = true;
          }
          if (!chosen) {
            this.milestonesForDialog.push(milestone);
          }
        });
      }
    )
  }

  saveMilestone() {
    this.issueService.addMilestone(this.issueId, this.newMilestone, this.currentUser.alias).subscribe(res => {
      console.log('saved milestone');
    })
  }

  close() {
    console.log('close');
  }

}
