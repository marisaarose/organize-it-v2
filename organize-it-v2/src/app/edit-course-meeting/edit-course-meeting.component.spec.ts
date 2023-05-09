import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseMeetingComponent } from './edit-course-meeting.component';

describe('EditCourseMeetingComponent', () => {
  let component: EditCourseMeetingComponent;
  let fixture: ComponentFixture<EditCourseMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseMeetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCourseMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
