import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealListComponent } from './deal-list/deal-list.component';
import { DealDetailComponent } from './deal-detail/deal-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


// import { DashboardComponent }   from './dashboard.component';
// import { HeroesComponent }      from './heroes.component';
// import { HeroDetailComponent }  from './hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/deal_list', pathMatch: 'full' },
  { path: 'deal_list',  component: DealListComponent },
  { path: 'detail/:id', component: DealDetailComponent },
  // { path: 'detail/:id', component: DealDetailComponent },
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent }


  // { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
