import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReviewDialogueComponent } from './new-review-dialogue.component';

describe('NewReviewDialogueComponent', () => {
  let component: NewReviewDialogueComponent;
  let fixture: ComponentFixture<NewReviewDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReviewDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReviewDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
