import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: boolean;
  constructor(private service: AuthenticationService) { }
  loggedin: boolean;

  ngOnInit() {

  }

  logoutAndAdios() {
    // if the user clicks disconnect we remove the auth_token
    localStorage.removeItem('auth_token');
  }
  isloggedin() {
    // this method checks if the user is loggedin
    this.loggedin = this.service.isloggedin();
    return this.service.isloggedin();
  }

}
