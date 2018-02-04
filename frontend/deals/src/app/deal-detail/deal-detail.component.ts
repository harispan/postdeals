import { Component, OnInit, Input } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {PostdataService} from '../services/postdata.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.css']
})
export class DealDetailComponent implements OnInit {


  deals: any;
  deal: any;
  reviews: any[];
  id: number;
  private sub: any;
  invalidLogin: boolean;
  likes: number;
  dislikes: number;
  deal_url: any;
  pictureLink: any;
  linkdesc: any;
  linktitle: any;
  linkurl: any;
  successSubmit: boolean;
  deal_reviews = [];
  newcomment = {};
  p: number = 1;


  constructor(private auth: AuthenticationService,private service: PostdataService ,private http: Http, private route: ActivatedRoute,private router: Router) {
  }

  ngOnInit() {
    // onInit we perform the following tasks
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number


    });


      // firstly we receive the deal information
      this.service.dealDetails(this.id).subscribe(posts => {
        this.deals = posts;
        this.deal_url = posts[0].url;
        this.deal_reviews = posts[0].reviews;

        // then we receive the info from the link preview (picture and description)
        this.service.linkDetails(this.deal_url).subscribe(posts2 => {
            this.pictureLink = posts2.image;
            this.linkdesc = posts2.description;
            this.linktitle = posts2.title;
            this.linkurl = posts2.url;


          }, error2 => console.log('error!'));
      });
      // finally we get the likes and dislikes for each deal
    this.service.getLikes(this.id)
      .subscribe(posts => {
        this.likes = posts.true;
        if (!this.likes) {
          this.likes = 0;
        }
        this.dislikes = posts.false;
        if (!this.dislikes) {
          this.dislikes = 0;
        }
      });

  }
  postComment(comment) {
    // method for posting a comment
    this.service.postComment(comment, this.id).subscribe(response => {
      let result = response.json();
      this.successSubmit = true;
      location.reload();

    } , (error) => {this.invalidLogin = true;
      localStorage.removeItem('auth_token'); } );

  }
  getId() {
    // method to receive the id for the deal
    return this.id;

  }
  isloggedin() {
    // method to check if the user is loggedin
    return this.auth.isloggedin();
  }
  like() {
    // method to perform like to a deal
    this.service.like(this.id).subscribe(posts => {
        console.log('like succesfully');
        location.reload();
      }, (error) => {this.invalidLogin = true;
      localStorage.removeItem('auth_token'); } );

  }
  dislike() {
    // method to perform a dislike for a deal
    this.service.dislike(this.id).subscribe(posts => {
        console.log('dislike succesfully');
        location.reload();
      }, (error) => {this.invalidLogin = true;
      localStorage.removeItem('auth_token'); } );

  }
  hasNoReviews() {
    // method to check if a deal has reviews or not
    if (this.deal_reviews.length === 0) {
      return true;
    } else {
      return false;
    }
  }

}
