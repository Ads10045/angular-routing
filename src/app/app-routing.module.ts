import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './general/home/home.component';
import { LoginComponent } from './general/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CardsComponent } from './general/card/cards.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ExpenseGuard } from './guards/expense.guard';

import { ContainerComponent } from './container.component';


/*const routes: Routes = [
 // { path: '', component: HomeComponent, },
 { path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: 'home', component: HomeComponent, canActivate: [ExpenseGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent , canActivate: [ExpenseGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cards', component: CardsComponent },
  { path: '**', component: NotFoundComponent }
];
*/

const routes: Routes = [
  { path: '', component: ContainerComponent,  pathMatch: 'full', canActivate: [ExpenseGuard], children: [
      { path: 'home', component: HomeComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'about', component: AboutComponent},
      { path: 'contact', component: ContactComponent },
     // { path: 'about', component: AboutComponent , canActivate: [ExpenseGuard]},
      { path: '**', component: NotFoundComponent }
  ] },
  { path: 'login', component: LoginComponent }, 
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }