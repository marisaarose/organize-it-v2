import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseMeetingComponent } from './add-course-meeting.component';

describe('AddCourseMeetingComponent', () => {
  let component: AddCourseMeetingComponent;
  let fixture: ComponentFixture<AddCourseMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseMeetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourseMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
