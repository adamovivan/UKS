import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser;

  constructor(private authService: AuthService,private router: Router, private userService: UserService) { 
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
      console.log(this.currentUser)
    });
  }

  ngOnInit(): void {
    const oauthScript = document.createElement('script');
    oauthScript.src = 'https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js';
    document.body.appendChild(oauthScript);
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  loginWithGithub(e) {
    // Prevents page reload
    e.preventDefault();

    // Initializes OAuth.io with API key
    _window().OAuth.initialize('pHVtP4yle7m-P5QR-kdWVuwMdz4');

    // Popup Github and ask for authorization
    _window().OAuth.popup('github').then((provider) => {
      // Prompts 'welcome' message with User's name on successful login
      // Check console logs for additional User info
      provider.me().then((data) => {
        this.userService.loginUser(data.alias).subscribe(
          data1 => {
            console.log('data: ', data);
            this.authService.saveUserInLocalStorage(data);

            // You can also call Github's API using .get()
            provider.get('/user').then((data) => {
              console.log('self data:', data);
            });
          },
          error => {
            alert("Please register!");
            this.router.navigate(['signUp']);
          }
          
        )
        
      });

    });
  }
}
