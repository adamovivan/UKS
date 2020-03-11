import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './main pages/header/header.component';
import { MainComponent } from './main pages/main/main.component';
import { SignInComponent } from './main pages/sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './main pages/profile/profile.component';
import { MilestonesComponent } from './milestones/milestones/milestones.component';
import { MilestonesAddComponent } from './milestones/milestones-add/milestones-add.component';
import { MilestonesUpdateComponent } from './milestones/milestones-update/milestones-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SignInComponent,
    ProfileComponent,
    MilestonesComponent,
    MilestonesAddComponent,
    MilestonesUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
