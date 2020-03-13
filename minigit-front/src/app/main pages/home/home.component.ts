import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SERVER_URL_FRONT } from 'src/app/app.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser;

  constructor(private authService: AuthService) { 
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }

  ngOnInit(): void {
  }

  //ovde ce se proslediti do kog repa a ownera imas gore i samo u urlu to uvezes ... za sad zakucano 
  repo(){
      //window.location.href = SERVER_URL_FRONT + this.owner + "/" + this.repo + "/milestones" primer;
      window.location.href = SERVER_URL_FRONT + "cla" + "/" + "cla" + "/repo";
  }

}
