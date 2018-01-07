import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  interval: any;
  token: boolean;
  constructor(private service: AuthenticationService) { }
  loggedin: boolean;

  ngOnInit() {

  }

  logoutAndAdios() {
    localStorage.removeItem('auth_token');
    console.log('efugeeeeee');
  }
  isloggedin() {
    this.loggedin = this.service.isloggedin();
    return this.service.isloggedin();
  }

}
