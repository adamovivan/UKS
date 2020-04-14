import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIssueRepoComponent } from './show-issue-repo.component';

describe('ShowIssueRepoComponent', () => {
  let component: ShowIssueRepoComponent;
  let fixture: ComponentFixture<ShowIssueRepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowIssueRepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIssueRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
