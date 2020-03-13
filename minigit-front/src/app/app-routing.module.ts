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


const routes: Routes = [
  {
    path: 'issues',
    component: ShowIssuesComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'issue/:id',
    component: ShowIssueComponent
  },
  {
    path : 'addIssue',
    component : AddIssueComponent
  }/*,
  {
    path: 'signIn',
    component: SignInComponent
  }*/,
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
    path: ':owner/:repo/milestones',
    component: MilestonesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':owner/:repo/issue',
    component: ShowIssueRepoComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
