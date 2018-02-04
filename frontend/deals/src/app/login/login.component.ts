import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';

import { Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  invalidLogin: boolean;
  wasloggedin: boolean;
  constructor(private service: AuthenticationService, private router: Router) {
  }
  ngOnInit() {
    // onInit we check if the user is loggedin and if true we disconnect him
    if (this.service.isloggedin()) {
      this.wasloggedin = true;
      localStorage.removeItem('auth_token');
    }
  }
  signIn(credentials) {
    // method to perform a login task

    this.service.login(credentials).subscribe(response => {
      let result = response.json();
      if (result && result.token) {
        // if the result exists and has a token then we store it and navigate the user to the main page
        localStorage.setItem('auth_token', result.token);
        this.router.navigate(['deal_list']);
        console.log('token apo database', result.token);
      } ;
    }, (error) => {this.invalidLogin = true } );
  }

}
