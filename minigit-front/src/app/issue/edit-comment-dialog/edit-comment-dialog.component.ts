import { Component, OnInit, Inject } from '@angular/core';
import { IssueService } from 'src/app/services/issue.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentEditDto } from 'src/app/dto/comment-edit.dto';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-edit-comment-dialog',
  templateUrl: './edit-comment-dialog.component.html',
  styleUrls: ['./edit-comment-dialog.component.css']
})
export class EditCommentDialogComponent implements OnInit {

  commentText: string;
  comment;

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private issueService: IssueService,
              private commonService: CommonService,
              public dialogRef: MatDialogRef<EditCommentDialogComponent>) { 
                  this.comment = data;
              }

  ngOnInit(): void {
    console.log(this.comment)
  }

  submitComment(){
    console.log(this.commentText);

    let commentEdit = new CommentEditDto();
    commentEdit.commentId = this.comment.pk;
    commentEdit.text = this.commentText;
    commentEdit.userId = this.comment.fields.user[1];
    commentEdit.issueId = this.comment.fields.issue;

    this.issueService.editComment(commentEdit).subscribe(res => {
      console.log(res);
      this.commonService.showMessage("Comment updated");
      this.dialogRef.close();
    },
    err => {
      this.commonService.somethingWentWrong();
    });
  }
}
