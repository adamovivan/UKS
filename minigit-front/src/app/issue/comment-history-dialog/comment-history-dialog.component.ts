import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-history-dialog',
  templateUrl: './comment-history-dialog.component.html',
  styleUrls: ['./comment-history-dialog.component.css']
})
export class CommentHistoryDialogComponent implements OnInit {

  comment;

  constructor(@Inject(MAT_DIALOG_DATA) data,
              public dialogRef: MatDialogRef<CommentHistoryDialogComponent>) { 
                  this.comment = data;
              }

  ngOnInit(): void {
    console.log(this.comment)
  }

}
