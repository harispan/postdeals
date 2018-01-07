import { Component, OnInit, OnChanges  } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {PostdataService} from '../services/postdata.service';
import {AuthenticationService} from '../services/authentication.service';
@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.css'],
})
export class DealListComponent implements OnInit, OnChanges  {

  p: number = 1;
  deals: any;
  reviews: any[];
  id: any;

  invalidLogin: boolean;
  successSubmit: boolean;




  constructor(private service: PostdataService, private auth: AuthenticationService, private http: Http) { }

  ngOnInit() {
    this.getData()
  }
  getData() {

    this.service.getDataFromServer().subscribe(posts => {
        this.deals = posts;
        console.log(this.deals);

      });
  }
  ngOnChanges() {

  }

  postDeal(data) {
    this.service.postDataToServer(data).subscribe(response => {
      let result = response.json();
      this.successSubmit = true;
      location.reload();
      // if (result && result.token) {
      //   localStorage.setItem('auth_token', result.token);
      //   this.router.navigate(['deal_list']);
      //   console.log('token apo database', result.token);
      // } ;
    } , (error) => {this.invalidLogin = true;
      localStorage.removeItem('auth_token'); } );


  }
  isloggedin() {

    return this.auth.isloggedin();

    // const token = localStorage.getItem('auth_token');
    // if (!token) {
    //   return false;
    // } else {
    //   return true;
    // }
  }

}
