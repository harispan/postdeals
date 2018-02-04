import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
// import { Overlay } from 'ngx-modialog';
// import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private service: AuthenticationService) {
  }
  ngOnInit() {
    // onInit we check if the current jwt is valid
    this.service.jwt_verifier().subscribe(response => {
      let result = response.json();
    }, (error) => { localStorage.removeItem('auth_token');
       });
  }

}
