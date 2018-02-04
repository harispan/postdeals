import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  invalidLogin: boolean;


  constructor(private service: AuthenticationService, private router: Router) {
  }

  ngOnInit() { }

  register(credentials) {
    // method to perform registration of a user and then navigation to login page
    this.service.register(credentials).subscribe(response => {
      let result = response.json();
      this.router.navigate(['login']);

    }, (error) => {this.invalidLogin = true } );

  }

}



