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
export class DealListComponent implements OnInit  {

  p: number = 1;
  deals: any;
  reviews: any[];
  id: any;
  invalidLogin: boolean;
  successSubmit: boolean;

  constructor(private service: PostdataService, private auth: AuthenticationService, private http: Http) { }

  ngOnInit() {
    // onInit we call the method getData
    this.getData()
  }
  getData() {
    // this method receives all the deals
    this.service.getDataFromServer().subscribe(posts => {
        this.deals = posts;
        console.log(this.deals);

      });
  }
   postDeal(data) {
    // method to post a deal
    this.service.postDataToServer(data).subscribe(response => {
      let result = response.json();
      this.successSubmit = true;
      location.reload();
    } , (error) => {this.invalidLogin = true;
      localStorage.removeItem('auth_token'); } );


  }
  isloggedin() {
    // method to check if a user is loggedin
    return this.auth.isloggedin();

  }

}
