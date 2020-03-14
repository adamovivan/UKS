import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SERVER_URL_FRONT } from 'src/app/app.constant';
import { UserService } from 'src/app/services/user.service';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser;
  repos;

  constructor(private authService: AuthService, private repositoryService: RepositoryService) { 
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
      if (this.currentUser != undefined){
        this.repositoryService.getRepositories(this.currentUser.alias).subscribe(data => this.repos = data)
      }
    });
  }

  ngOnInit():void{
   
      

  }



  //ovde ce se proslediti do kog repa a ownera imas gore i samo u urlu to uvezes ... za sad zakucano 
  repo(title){
      //window.location.href = SERVER_URL_FRONT + this.owner + "/" + this.repo + "/milestones" primer;
      // alert(title);
      window.location.href = SERVER_URL_FRONT + this.currentUser.alias + "/" + title + "/repo";
  }

}
