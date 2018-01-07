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

  ngOnInit() {
  }



  signIn(credentials) {
    // this.http.post(this.url,
    //   JSON.stringify(credentials), options).subscribe(response => {
    //   console.log(response);
    // });
    this.service.register(credentials).subscribe(response => {
      let result = response.json();
      this.router.navigate(['login']);
      // console.log(result);
      // console.log(result.token);
      // if (result && result.token) {
      //   localStorage.setItem('auth_token', result.token);
      //   this.router.navigate(['deal_list']);
      //   console.log('token apo database', result.token);
      // } ;
    }, (error) => {this.invalidLogin = true } );
    // this.http.post(this.url,
    //   JSON.stringify(credentials)).map(response => {
    //   console.log(response.json())
    // });
    // response.json())
    // .subscribe(result => {
    //   console.log(result);
    //   if (result)
    //     this.router.navigate(['/']);
    //   else
    //     this.invalidLogin = true;
    // }
    // );
  }

}



