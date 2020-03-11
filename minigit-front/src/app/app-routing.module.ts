import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddIssueComponent } from './issue/add-issue/add-issue.component';
import { SignInComponent } from './main pages/sign-in/sign-in.component';
import { AuthGuard } from './helpers/auth.guard';
import { ProfileComponent } from './main pages/profile/profile.component';
import { ShowIssuesComponent } from './issue/show-issues/show-issues.component';
import { MilestonesComponent } from './milestones/milestones/milestones.component';
import { MilestonesAddComponent } from './milestones/milestones-add/milestones-add.component';
import { MilestonesUpdateComponent } from './milestones/milestones-update/milestones-update.component';


const routes: Routes = [
  {
    path: 'issues', 
    component: ShowIssuesComponent
  },
  {
    path : 'addIssue', 
    component : AddIssueComponent
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
