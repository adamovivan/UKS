import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddIssueComponent } from './issue/add-issue/add-issue.component';
import { SignInComponent } from './main pages/sign-in/sign-in.component';
import { AuthGuard } from './helpers/auth.guard';
import { ProfileComponent } from './main pages/profile/profile.component';
import { ShowIssuesComponent } from './issue/show-issues/show-issues.component';
import { MilestonesComponent } from './milestones/milestones/milestones.component';
import { MilestonesAddComponent } from './milestones/milestones-add/milestones-add.component';
import { ShowIssueComponent } from './issue/show-issue/show-issue.component';
import { MilestonesUpdateComponent } from './milestones/milestones-update/milestones-update.component';
import { HomeComponent } from './main pages/home/home.component';
import { RepoShowComponent } from './repo/repo-show/repo-show.component';
import { ShowIssueRepoComponent } from './issue/show-issue-repo/show-issue-repo.component';
import { SignUpComponent } from './main pages/sign-up/sign-up.component';
import { CommitComponent } from './repo/commit/commit.component';
import { ShowIssueMilestoneComponent } from './issue/show-issue-milestone/show-issue-milestone.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'issues',
    component: ShowIssuesComponent
  },
  {
    path: ':owner/:repo/issue/:id',
    component: ShowIssueComponent
  },
  {
    path : ':user/:repo/addIssue',
    component : AddIssueComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'signUp', 
    component: SignUpComponent
   },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':owner/:repo/repo',
    component: RepoShowComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':owner/:repo/commit',
    component: CommitComponent,
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
    path: ':owner/:repo/milestones/:id',
    component: ShowIssueMilestoneComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':owner/:repo/milestones/update/:id',
    component: MilestonesUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':owner/:repo/issue',
    component: ShowIssueRepoComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
