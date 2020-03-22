import { Component, OnInit, Inject } from '@angular/core';
import { IssueService } from 'src/app/services/issue.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-label-dialog',
  templateUrl: './edit-label-dialog.component.html',
  styleUrls: ['./edit-label-dialog.component.css']
})
export class EditLabelDialogComponent implements OnInit {

  labels;
  chosenLabels;
  labelsForDialog = [];
  newLabels;
  issueId;
  currentUser;

  constructor(
    private issueService: IssueService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.chosenLabels = this.data["labels"];
    this.issueId = this.data["issueId"];
    this.currentUser = this.data["currentUser"];
    this.issueService.getLabels().subscribe(
      data => {
        this.labels = data;
        this.labels.forEach(label => {
          let chosen = false;
          this.chosenLabels.forEach(chosenLabel => {
            if (label.pk==chosenLabel.pk){
              chosen = true;
            }
          });
          if (!chosen) {
            this.labelsForDialog.push(label);
          }
        });
      }
    )
  }

  saveLabel() {
    this.issueService.addLabels(this.issueId, this.newLabels, this.currentUser.alias).subscribe(res => {
      console.log('saved label');
    })
  }

  close() {
    console.log('close');
  }

}
