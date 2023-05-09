import { Component, Inject, OnInit } from '@angular/core';
import { Instructor } from '../instructor';
import { CourseService } from '../course.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Course } from '../course';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) private data: Course, private courseService: CourseService, private fb: FormBuilder) {}

  instructor: Instructor[];
  selectedType: string = this.data.type;

  updCourse: Course = {
    course_id: this.data.course_id,
    name: '',
    color: '',
    credits: 0,
    type: '',
    instructor: 0,
    details: ''
  }

  courseForm = this.fb.group({
    name: [this.data.name, Validators.required],
    color: [this.data.color, Validators.required],
    credits: [this.data.credits],
    type: [this.data.type, Validators.required],
    instructor: [this.data.instructor],
    details: [this.data.details]
  })

  updateValues() {
    this.updCourse.name = this.courseForm.value.name!;
    this.updCourse.color = this.courseForm.value.color!;
    this.updCourse.credits = Number(this.courseForm.value.credits!);
    this.updCourse.type = this.courseForm.value.type!;
    this.updCourse.instructor = Number(this.courseForm.value.instructor!);
    this.updCourse.details = this.courseForm.value.details!;
  }

  editCourse() {
    this.courseService.editCourse(this.updCourse).subscribe(data => {
      console.log(data);
    })
  }

  getInstructors() {
    this.courseService.getInstructors().subscribe(data => {
      this.instructor = data;
    })
  }

  onSubmit() {
    this.updateValues();
    this.editCourse();
  }

  ngOnInit(): void {
    this.getInstructors();
  }
}
