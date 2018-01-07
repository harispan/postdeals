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
    this.service.jwt_verifier().subscribe(response => {
      let result = response.json();
      console.log('works! in jwt verifier')
      // console.log(result);
      // console.log(result.token);
      // if (result && result.token) {
      //   localStorage.setItem('auth_token', result.token);
      //   this.router.navigate(['deal_list']);
      //   console.log('token apo database', result.token);
      // } ;
    }, (error) => { localStorage.removeItem('auth_token');
       });
  }
  // onClick() {
  //   const dialogRef = this.modal.alert()
  //     .size('lg')
  //     .showClose(true)
  //     .title('You have been logged-out!')
  //     .body(`
  //           <h4>Due to your inactivity you have been logged-out,
  //            please login again.</h4>
  //           <br>
  //           <p>To close this window:</p>
  //           <ul>
  //               <li>click anywhere outside</li>
  //               <li>press ESC key</li>
  //               <li>click button OK</li>
  //           </ul>`)
  //     .open();
  //
  //   dialogRef.then( dialogRef => {
  //       dialogRef.result.then( result => alert(`The result is: ${result}`));
  //     });
  // }
}
