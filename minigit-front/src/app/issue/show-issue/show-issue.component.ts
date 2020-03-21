import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from 'src/app/services/issue.service';
import { CommentDto } from 'src/app/dto/comment.dto';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { EditCommentDialogComponent } from '../edit-comment-dialog/edit-comment-dialog.component';
import { CommentHistoryDialogComponent } from '../comment-history-dialog/comment-history-dialog.component';
import { CommonService } from 'src/app/services/common.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EditAssigneeDialogComponent } from '../edit-assignee-dialog/edit-assignee-dialog.component';


@Component({
  selector: 'app-show-issue',
  templateUrl: './show-issue.component.html',
  styleUrls: ['./show-issue.component.css']
})
export class ShowIssueComponent implements OnInit {

  issueId: string;
  issue: any;
  commentText: string;
  newComment: any;
  openCloseBtnName = "Close Issue";
  currentUser;
  comments: any = [];
  commentDisabled = false;
  assignees: any;
  labels: any;
  labelColor: any;
  milestone: any;

  issueEvents: any = [];

  constructor(private route: ActivatedRoute,
    private issueService: IssueService,
    private authService: AuthService,
    public dialog: MatDialog,
    private commonService: CommonService) { }

  ngOnInit(): void {
    
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser)
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.issueId = params['id'];
      this.issueService.getIssue(this.issueId).subscribe(res => {
        this.issue = res;
        console.log(res);

        if(this.issue.fields.state === 'OPEN'){
          this.openCloseBtnName = "Close Issue";
          this.commentDisabled = false;
        }
        else{
          this.openCloseBtnName = "Reopen Issue";
          this.commentDisabled = true;
        }
        
        this.getAssignees(this.issue.fields.assignees);
        this.getLabels(this.issue.fields.labels)
        this.getMilestone(this.issue.fields.milestone)

        // this.getIssueComments();
        this.getIssueEvents();
      });
    });
  }

  getAssignees(assigneesIds) {
    this.issueService.getAssignees(assigneesIds).subscribe(res => {
      this.assignees = res;
    })
  }

  getLabels(labelsIds) {
    this.issueService.getIssueLabels(labelsIds).subscribe(res => {
      this.labels = res;
    })
  }

  getMilestone(milestoneId) {
    this.issueService.getIssueMilestone(milestoneId).subscribe(res => {
      this.milestone = res;
    })
  }

  getCommentChanges(){
    for(let comment of this.comments){
      this.issueService.getCommentChanges(comment.pk).subscribe(res => {
        comment["edits"] = res;
      });
    }
  }

  getIssueEvents(){
    this.issueService.getIssueEvents(this.issue.pk).subscribe(res => {
      console.log(res);
      this.issueEvents = res;

      for(let event of this.issueEvents) {
        if(event.model === 'better_than_github.comment'){
          this.issueService.getCommentChanges(event.pk).subscribe(res => {
            event["edits"] = res;
          });
        }
      }
    });
  }

  getStateChanges(){
    this.issueService.getStateChanges(this.issue.pk).subscribe(res => {
      console.log(res);
    });
  }

  showEditHistory(comment){
    let dialogRef = this.dialog.open(CommentHistoryDialogComponent, {
      width: '45pc',
      data: comment,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  editCommentDialog(comment){
    let dialogRef = this.dialog.open(EditCommentDialogComponent, {
      width: '45pc',
      data: comment
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getIssueEvents();
    });
  }

  toggleIssueState(){  
    this.issueService.changeState(this.issue.pk, this.currentUser.alias).subscribe(res => {
      console.log(res);
      this.issue = res;

      if(this.issue.fields.state === 'OPEN'){
        this.openCloseBtnName = "Close Issue";
        this.commentDisabled = false;
        this.commonService.showMessage('Issue re-opened');
      }
      else{
        this.openCloseBtnName = "Reopen Issue";
        this.commentDisabled = true;
        this.commonService.showMessage('Issue closed');
      }

      this.getIssueEvents();
    },
    () => {
      this.commonService.somethingWentWrong();
    });
  }

  

  submitComment(){
    if(this.commentText === undefined || this.commentText === ''){
      return;
    }

    let commentDto = new CommentDto();
    commentDto.issueId = this.issueId;
    commentDto.text = this.commentText;
    commentDto.user = this.currentUser.alias;
    console.log(this.currentUser)
    this.issueService.addComment(commentDto).subscribe(res => {
      console.log(res)
      this.newComment = res;
      this.commentText = '';
      this.getIssueEvents();
    });
  }

  openAssigneeDialog() {
    let dialogRef = this.dialog.open(
      EditAssigneeDialogComponent,
      {data: {assignees: this.assignees, issueId: this.issueId, currentUser: this.currentUser}}
    );
    
    dialogRef.afterClosed().subscribe(result => {
      this.issueService.getIssue(this.issueId).subscribe(res => {
        this.issue = res;
        this.getAssignees(this.issue.fields.assignees);
        this.getIssueEvents();
      });
    })
  }

  deleteAssignee(assignee) {
    this.issueService.deleteAssignee(this.issueId, assignee, this.currentUser.alias).subscribe(res => {
      this.issueService.getIssue(this.issueId).subscribe(res => {
        this.issue = res;
        this.getAssignees(this.issue.fields.assignees);
        this.getIssueEvents();
      });
    })

  }
}