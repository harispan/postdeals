import { Injectable } from '@angular/core';
import {Headers} from '@angular/http';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';

@Injectable()
export class PostdataService {
  private getdataurl = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/deals/';
  private post_deal_url = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/deals/';
  private dealdetailurl = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/deals/';
  private linkpreview_url = 'https://api.linkpreview.net/?key=5a08561a1577a47612e2e3b4b1d6b859aa04cfefcea4b&q=';
  private likes_url = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/voting/votes/likes/?model=deal;id=';
  private post_comment_url = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/reviews/';
  private like_url = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/voting/votes/up/?model=deal&vote=true&id=';
  private dislike_url = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/voting/votes/up/?model=deal&vote=false&id=';


  constructor(private http: Http) { }
  getDataFromServer() {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('auth_token' ,  token);
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.getdataurl, options).map(response => response.json());
  }
  postDataToServer(data) {
    const token = localStorage.getItem('auth_token');
    // xwris jwt
    // const auth_token = { 'authorization' : +' Token ' + token };
    const auth_token = { 'Authorization' : +' JWT ' + token };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append(auth_token);
    headers.append('Authorization', ' JWT ' + token);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.post_deal_url, JSON.stringify(data), options);

  }
  dealDetails(id) {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('auth_token' ,  token);
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.dealdetailurl + id , options).map(response => response.json());
  }
  linkDetails(deal_url) {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('auth_token' ,  token);
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.linkpreview_url + deal_url, options).map(response => response.json())

  }
  getLikes(id) {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('auth_token' ,  token);
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.likes_url + id , options).map(response => response.json())

  }
  postComment(comment, id) {
    const token = localStorage.getItem('auth_token');
    // const auth_token = { 'authorization' : +' Token ' + token };
    const auth_token = { 'Authorization' : +' JWT ' + token };

    console.log(comment);


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append(auth_token);
    headers.append('Authorization', ' JWT ' + token);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.post_comment_url + id,
      JSON.stringify(comment), options)
  }
  like(id) {
    const token = localStorage.getItem('auth_token');
    // const auth_token = { 'authorization' : +' Token ' + token };
    const auth_token = { 'Authorization' : +' JWT ' + token };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append(auth_token);
    // headers.append('authorization', ' Token ' + token);
    headers.append('Authorization', ' JWT ' + token);

    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.like_url + id , options).map(response => response.json())
  }
  dislike(id) {
    const token = localStorage.getItem('auth_token');
    // const auth_token = { 'authorization' : +' Token ' + token };
    const auth_token = { 'Authorization' : +' JWT ' + token };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append(auth_token);
    headers.append('Authorization', ' JWT ' + token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.dislike_url + id , options).map(response => response.json())

  }

}
