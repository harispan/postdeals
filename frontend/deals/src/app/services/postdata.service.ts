import { Injectable } from '@angular/core';
import {Headers} from '@angular/http';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PostdataService {
  private getdataurl = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/deals/';
  private post_deal_url = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/deals/';
  private dealdetailurl = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/deals/';
  // link that receives the picture of a deal and the description as a json
  private linkpreview_url = 'https://api.linkpreview.net/?key=5a08561a1577a47612e2e3b4b1d6b859aa04cfefcea4b&q=';
  private likes_url = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/voting/votes/likes/?model=deal;id=';
  private post_comment_url = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/reviews/';
  private like_url = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/voting/votes/up/?model=deal&vote=true&id=';
  private dislike_url = 'https://snf-796636.vm.okeanos.grnet.gr/api/v1/voting/votes/up/?model=deal&vote=false&id=';


  constructor(private http: Http) { }
  getDataFromServer(): Observable<any> {
    // get method which receives the deals
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.getdataurl, options).map(response => response.json());
  }
  postDataToServer(data): Observable<any>  {
    // post method that posts a deal
    const token = localStorage.getItem('auth_token');
    const auth_token = { 'Authorization' : +' JWT ' + token };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', ' JWT ' + token);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.post_deal_url, JSON.stringify(data), options);

  }
  dealDetails(id): Observable<any> {
    // get method that receives a specific deal and tis comments
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.dealdetailurl + id , options).map(response => response.json());
  }
  linkDetails(deal_url): Observable<any> {
    // get method that receives image and description of a deal from an external API
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.linkpreview_url + deal_url, options).map(response => response.json())

  }
  getLikes(id): Observable<any> {
    // get method that receives the likes and dislikes for a deal
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.likes_url + id , options).map(response => response.json())

  }
  postComment(comment, id): Observable<any> {
    // post method that posts the comment
    const token = localStorage.getItem('auth_token');
    const auth_token = { 'Authorization' : +' JWT ' + token };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Authorization', ' JWT ' + token);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.post_comment_url + id,
      JSON.stringify(comment), options)
  }
  like(id): Observable<any> {
    //get method that performs a like action for a deal
    const token = localStorage.getItem('auth_token');

    const auth_token = { 'Authorization' : +' JWT ' + token };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', ' JWT ' + token);

    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.like_url + id , options).map(response => response.json())
  }
  dislike(id): Observable<any> {
    // get method that performs a dislike action for a specific deal
    const token = localStorage.getItem('auth_token');
    const auth_token = { 'Authorization' : +' JWT ' + token };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', ' JWT ' + token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.dislike_url + id , options).map(response => response.json())

  }

}
