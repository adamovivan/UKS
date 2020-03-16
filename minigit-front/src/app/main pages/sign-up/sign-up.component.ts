import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  constructor(private builder: FormBuilder, private userService: UserService, private router: Router) { 
    this.registerForm = this.builder.group({
      'username' : ['', Validators.required],
      'email' : ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }


  get form(){ return this.registerForm.controls;}

  registerUser(){
    //alert(JSON.stringify(this.registerForm.value))
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }

    this.userService.registerUser(this.registerForm.value).subscribe(
      data => {
        alert(data);
        this.router.navigate(['']);
      },
      error => {
        alert(error.message)
      }
      
    )

  }

}
