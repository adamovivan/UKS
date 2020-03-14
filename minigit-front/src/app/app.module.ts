import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './main pages/header/header.component';
import { MainComponent } from './main pages/main/main.component';
import { AddIssueComponent } from './issue/add-issue/add-issue.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './main pages/sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './main pages/profile/profile.component';
import { ShowIssuesComponent } from './issue/show-issues/show-issues.component';
import { MilestonesComponent } from './milestones/milestones/milestones.component';
import { MilestonesAddComponent } from './milestones/milestones-add/milestones-add.component';
import { ShowIssueComponent } from './issue/show-issue/show-issue.component';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MilestonesUpdateComponent } from './milestones/milestones-update/milestones-update.component';
import { EditCommentDialogComponent } from './issue/edit-comment-dialog/edit-comment-dialog.component';
import { CommonService } from './services/common.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommentHistoryDialogComponent } from './issue/comment-history-dialog/comment-history-dialog.component';
import { HomeComponent } from './main pages/home/home.component';
import { RepoShowComponent } from './repo/repo-show/repo-show.component';
import { ShowIssueRepoComponent } from './issue/show-issue-repo/show-issue-repo.component';
import { SignUpComponent } from './main pages/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    AddIssueComponent,
    SignInComponent,
    ProfileComponent,
    ShowIssuesComponent,
    MilestonesComponent,
    MilestonesAddComponent,
    ShowIssueComponent,
    MilestonesAddComponent,
    MilestonesUpdateComponent,
    EditCommentDialogComponent,
    CommentHistoryDialogComponent,
    HomeComponent,
    RepoShowComponent,
    ShowIssueRepoComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  entryComponents: [
    EditCommentDialogComponent,
    CommentHistoryDialogComponent
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
