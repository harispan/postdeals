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
    if (this.service.isloggedin()) {
      this.wasloggedin = true;
      localStorage.removeItem('auth_token');
    }
  }
  signIn(credentials) {



    this.service.login(credentials).subscribe(response => {
      let result = response.json();

      // console.log(result);
      // console.log(result.token);
      if (result && result.token) {
        localStorage.setItem('auth_token', result.token);
        this.router.navigate(['deal_list']);
        console.log('token apo database', result.token);
      } ;
    }, (error) => {this.invalidLogin = true } );
  }

}
