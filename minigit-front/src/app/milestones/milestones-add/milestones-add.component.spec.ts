import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestonesAddComponent } from './milestones-add.component';

describe('MilestonesAddComponent', () => {
  let component: MilestonesAddComponent;
  let fixture: ComponentFixture<MilestonesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestonesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestonesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
