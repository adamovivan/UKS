import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser;

  constructor(private authService: AuthService) { 
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }

  ngOnInit(): void {
  }

}
