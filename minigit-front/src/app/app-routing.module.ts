import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main pages/main/main.component';
import { SignInComponent } from './main pages/sign-in/sign-in.component';
import { AuthGuard } from './helpers/auth.guard';
import { ProfileComponent } from './main pages/profile/profile.component';
import { MilestonesComponent } from './milestones/milestones/milestones.component';
import { MilestonesAddComponent } from './milestones/milestones-add/milestones-add.component';
import { MilestonesUpdateComponent } from './milestones/milestones-update/milestones-update.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: ':owner/:repo/milestones',
    component: MilestonesComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: ':owner/:repo/milestones/create',
    component: MilestonesAddComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: ':owner/:repo/milestones/update/:id',
    component: MilestonesUpdateComponent,
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
