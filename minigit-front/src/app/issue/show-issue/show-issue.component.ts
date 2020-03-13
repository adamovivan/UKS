import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from 'src/app/services/issue.service';
import { CommentDto } from 'src/app/dto/comment.dto';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCommentDialogComponent } from '../edit-comment-dialog/edit-comment-dialog.component';
import { CommentHistoryDialogComponent } from '../comment-history-dialog/comment-history-dialog.component';


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

  constructor(private route: ActivatedRoute,
    private issueService: IssueService,
    private authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.authService.currentUser.subscribe(x => this.currentUser = x);
 
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

        this.getIssueEvents();
      });
    });
  }

  getCommentChanges(){
    for(let comment of this.comments){
      this.issueService.getCommentChanges(comment.pk).subscribe(res => {
        comment["edits"] = res;
      });
    }

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
      this.getCommentChanges();
    });
  }

  toggleIssueState(){
    if(this.issue.fields.state === 'OPEN'){
      this.issue.fields.state = 'CLOSED';
      this.openCloseBtnName = "Reopen Issue";
      this.commentDisabled = true;
    }
    else{
      this.issue.fields.state = 'OPEN';
      this.openCloseBtnName = "Close Issue";
      this.commentDisabled = false;
    }
    
  }

  getIssueEvents(){
    this.issueService.getIssueEvents(this.issueId).subscribe(res => {
      console.log(res);
      this.comments = res;
      this.getCommentChanges();
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

}