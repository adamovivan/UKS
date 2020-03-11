import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestonesUpdateComponent } from './milestones-update.component';

describe('MilestonesUpdateComponent', () => {
  let component: MilestonesUpdateComponent;
  let fixture: ComponentFixture<MilestonesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestonesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestonesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
