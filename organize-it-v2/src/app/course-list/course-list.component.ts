import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { Instructor } from '../instructor';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  constructor(private courseService: CourseService) {}
  courses: Course[] = [];
  instructors: Instructor[];

  newDialog(type: string) {
    if(type == 'course'){
      this.courseService.newCoursesDialog();
    } else if(type == 'instructor'){
      this.courseService.newInstructorsDialog();
    }
  }

  getCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    })
  }

  getInstructors() {
    this.courseService.getInstructors().subscribe(data => {
      this.instructors = data;
    })
  }

  ngOnInit(): void {
    this.getCourses();
    this.getInstructors();
  }
}

