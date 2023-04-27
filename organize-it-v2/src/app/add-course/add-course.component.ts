import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Instructor } from '../instructor';
import { Course } from '../course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor(private courseService: CourseService, private fb: FormBuilder) {}

  instructor: Instructor[];

  newcourse: Course = {
    course_id: this.courseService.nextCourseID++,
    name: '',
    color: '',
    credits: 0,
    type: '',
    instructor: 0,
    details: ''
  }

  courseForm = this.fb.group({
    name: ['', Validators.required],
    color: ['', Validators.required],
    credits: [new Number],
    type: [''],
    instructor: [new Number],
    details: ['']
  })

  updateValues() {
    this.newcourse.name = this.courseForm.value.name!;
    this.newcourse.color = this.courseForm.value.color!;
    this.newcourse.credits = Number(this.courseForm.value.credits!);
    this.newcourse.type = this.courseForm.value.type!;
    this.newcourse.instructor = Number(this.courseForm.value.instructor!);
    this.newcourse.details = this.courseForm.value.details!;
  }

  addCourse() {
    this.courseService.addCourse(this.newcourse).subscribe(data => {
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
    this.addCourse();
  }

  ngOnInit(): void {
    this.getInstructors();
  }
}
