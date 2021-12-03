import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service'
import { Credentials } from 'src/app/model/credentials';

@Component({
  selector: 'wt-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  credentials: Credentials;
  
  errorMessage: string;
  
  loading: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.credentials = new Credentials();
    this.loading = false;
  }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.authService.login(this.credentials).subscribe(
      _ => {
        this.loading = false;
        this.router.navigateByUrl('/chat');
      },
      error => {
        this.loading = false;
        if (error.status === 401) {
          this.errorMessage = 'username or password incorrect'
        } else {
          this.errorMessage = 'login was not possible for unknown reason'
        }
      });
  }

}
