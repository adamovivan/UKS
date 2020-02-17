import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main pages/main/main.component';
import { AddIssueComponent } from './issue/add-issue/add-issue.component';


const routes: Routes = [
{
  path : 'addIssue', 
  component : AddIssueComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
