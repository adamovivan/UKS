import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/services/issue.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent implements OnInit {

  labels;

  constructor(private issueService : IssueService) { }

  ngOnInit(): void {
    this.issueService.getLabels().subscribe(
      data => {
        alert(data);
        this.labels = data;
        alert(this.labels);
      }
    )
  }

}
