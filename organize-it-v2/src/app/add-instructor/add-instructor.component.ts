import { Component } from '@angular/core';
import { CourseService } from '../course.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Instructor } from '../instructor';

@Component({
  selector: 'app-add-instructor',
  templateUrl: './add-instructor.component.html',
  styleUrls: ['./add-instructor.component.css']
})
export class AddInstructorComponent {
  constructor(private courseService: CourseService, private fb: FormBuilder) {}

  newinstructor: Instructor = {
    instructor_id: this.courseService.nextInstID++,
    first_name: '',
    last_name: '',
    email: '',
    office: '',
    office_details: ''
  }

  instructorForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: [''],
    office: [''],
    office_details: ['']
  });

  updateValues() {
    this.newinstructor.first_name = this.instructorForm.value.first_name!;
    this.newinstructor.last_name = this.instructorForm.value.last_name!;
    this.newinstructor.email = this.instructorForm.value.email!;
    this.newinstructor.office = this.instructorForm.value.office!;
    this.newinstructor.office_details = this.instructorForm.value.office_details!;
  }

  addInstructor() {
    this.courseService.addInstructor(this.newinstructor).subscribe(data => {
      console.log(data);
    })
  }

  onSubmit() {
    this.updateValues();
    this.addInstructor();
  }
}



