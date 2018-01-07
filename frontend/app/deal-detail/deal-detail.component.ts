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
  popularity: any;
  deal_url: any;
  pictureLink: any;
  linkdesc: any;
  linktitle: any;
  linkurl: any;
  successSubmit: boolean;
  // deal_reviews: any;
  deal_reviews = [];
  newcomment = {};
  p: number = 1;

  new_comment: any;
  constructor(private auth: AuthenticationService,private service: PostdataService ,private http: Http, private route: ActivatedRoute,private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number


    });


    // console.log('skata reee', this.id);


      this.service.dealDetails(this.id).subscribe(posts => {
        this.deals = posts;
        this.deal_url = posts[0].url;
        this.deal_reviews = posts[0].reviews;
        console.log('posts.reviews',this.deal_reviews);
        console.log(posts);
        console.log(this.deals);
        // console.log('deal_url', this.linkpreview_url + this.deal_url);
        this.service.linkDetails(this.deal_url).subscribe(posts2 => {
            this.pictureLink = posts2.image;
            this.linkdesc = posts2.description;
            this.linktitle = posts2.title;
            this.linkurl = posts2.url;
            console.log("picture link", this.pictureLink);

          }, error2 => console.log('error!'));
      });
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
    this.service.postComment(comment, this.id).subscribe(response => {
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
    // this.newcomment: {'owner': 'me', 'comment': comment};
    // DOC:  pusharume to neo comment sto array mas
    // this.deal_reviews.push(comment);
    // location.reload();
    // this.router.navigate(['detail/' + this.id]).then(() => {this.router.navigate(['detail/' + this.id])});
    // this.router.navigate(['detail/' + this.id ]);
    // this.router.navigate('detail/  this.id');
    // this.deal_reviews.push(comment);
    // console.log("reviews",this.deal_reviews );
    // // this.new_comment = comment;
  }
  getId() {
    console.log('id reeee', this.id);
    return this.id;

  }
  isloggedin() {
    return this.auth.isloggedin();
  }
  like() {
    this.service.like(this.id).subscribe(posts => {
        console.log('like succesfully');
        location.reload();
      }, (error) => {this.invalidLogin = true;
      localStorage.removeItem('auth_token'); } );

  }
  dislike() {
    this.service.dislike(this.id).subscribe(posts => {
        console.log('dislike succesfully');
        location.reload();
      }, (error) => {this.invalidLogin = true;
      localStorage.removeItem('auth_token'); } );

  }
  hasNoReviews() {
    if (this.deal_reviews.length === 0) {
      return true;
    } else {
      return false;
    }
  }

}
