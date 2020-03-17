import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoShowComponent } from './repo-show.component';

describe('RepoShowComponent', () => {
  let component: RepoShowComponent;
  let fixture: ComponentFixture<RepoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
