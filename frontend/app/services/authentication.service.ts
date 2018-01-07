import { Injectable } from '@angular/core';
import {Headers} from '@angular/http';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
@Injectable()
export class AuthenticationService {

  private logurl = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/api-token-auth/';
  private jwt_verify_url = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/api-token-verify/';

  private regurl = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/create_user/';
  constructor(private http: Http) { }

  login(credentials) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.logurl,
      JSON.stringify(credentials), options);
  }
  register(credentials) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.regurl,
      JSON.stringify(credentials), options);
  }
  isloggedin() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return false;
    } else {
      return true;
    }
  }
  jwt_verifier() {
    const token = localStorage.getItem('auth_token');
    // const auth_token = { 'authorization' : +' Token ' + token };
    const auth_token = { 'token' :  token };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append(auth_token);
    // headers.append('Authorization', ' JWT ' + token);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.jwt_verify_url, JSON.stringify(auth_token), options)


  }

}
