import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DealListComponent } from './deal-list/deal-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { DealDetailComponent } from './deal-detail/deal-detail.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http} from '@angular/http';
// import { LoginService } from './login.service';
import { AuthenticationService } from './services/authentication.service';
import { PostdataService } from './services/postdata.service';
import { RegisterComponent } from './register/register.component';
import {NgxPaginationModule} from 'ngx-pagination';
// import { ModalModule } from 'ngx-modialog';
// import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
// import { LikesDirective } from './LikesDirective';
// import { OrderBy } from './orderBy';
// import { PostCommentComponent } from './deal-detail/post-comment/post-comment.component';
// import { PostSuccessComponent } from './services/post-success/post-success.component';

@NgModule({
  declarations: [
    AppComponent,
    DealListComponent,
    NavbarComponent,
    DealDetailComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgxPaginationModule,
    // ModalModule.forRoot(),
    // BootstrapModalModule
  ],
  providers: [
    AuthenticationService,
    PostdataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
