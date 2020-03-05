import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main pages/header/header.component';
import { MainComponent } from './main pages/main/main.component';
import { AddIssueComponent } from './issue/add-issue/add-issue.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './main pages/sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './main pages/profile/profile.component';
import { ShowIssuesComponent } from './issue/show-issues/show-issues.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    AddIssueComponent,
    SignInComponent,
    ProfileComponent,
    ShowIssuesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
