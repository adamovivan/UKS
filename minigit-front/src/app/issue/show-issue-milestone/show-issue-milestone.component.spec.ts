import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIssueMilestoneComponent } from './show-issue-milestone.component';

describe('ShowIssueMilestoneComponent', () => {
  let component: ShowIssueMilestoneComponent;
  let fixture: ComponentFixture<ShowIssueMilestoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowIssueMilestoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIssueMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
