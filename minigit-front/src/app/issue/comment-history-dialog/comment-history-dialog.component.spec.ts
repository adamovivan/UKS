import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentHistoryDialogComponent } from './comment-history-dialog.component';

describe('CommentHistoryDialogComponent', () => {
  let component: CommentHistoryDialogComponent;
  let fixture: ComponentFixture<CommentHistoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentHistoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
