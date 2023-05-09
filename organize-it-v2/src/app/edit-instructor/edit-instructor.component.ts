import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from '../course.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Instructor } from '../instructor';

@Component({
  selector: 'app-edit-instructor',
  templateUrl: './edit-instructor.component.html',
  styleUrls: ['./edit-instructor.component.css']
})
export class EditInstructorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Instructor, private courseService: CourseService, private fb: FormBuilder) {}

  updinstructor: Instructor = {
    instructor_id: this.data.instructor_id,
    first_name: '',
    last_name: '',
    email: '',
    office: '',
    office_details: ''
  }

  instructorForm = this.fb.group({
    first_name: [this.data.first_name, Validators.required],
    last_name: [this.data.last_name, Validators.required],
    email: [this.data.email],
    office: [this.data.office],
    office_details: [this.data.office_details]
  });

  updateValues() {
    this.updinstructor.first_name = this.instructorForm.value.first_name!;
    this.updinstructor.last_name = this.instructorForm.value.last_name!;
    this.updinstructor.email = this.instructorForm.value.email!;
    this.updinstructor.office = this.instructorForm.value.office!;
    this.updinstructor.office_details = this.instructorForm.value.office_details!;
  }

  editInstructor() {
    this.courseService.editInstructor(this.updinstructor).subscribe(data => {
      console.log(data);
    })
  }

  onSubmit() {
    this.updateValues();
    this.editInstructor();
  }

  ngOnInit(): void {
  }

}
