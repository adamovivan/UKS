import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repo-show',
  templateUrl: './repo-show.component.html',
  styleUrls: ['./repo-show.component.css']
})
export class RepoShowComponent implements OnInit {
  repo = '';
  user = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.repo = params.get("repo");
      this.user = params.get("owner")
    })
  }

}
