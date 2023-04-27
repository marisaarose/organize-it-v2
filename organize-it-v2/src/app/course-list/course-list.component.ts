import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  constructor(private courseService: CourseService) {}
  courses: Course[] = [];

  newDialog(type: string) {
    if(type == 'course'){
      this.courseService.newCoursesDialog();
    } else if(type == 'instructor'){
      this.courseService.newInstructorsDialog();
    }
  }

  fetchData() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    })
  }

  ngOnInit(): void {
    this.fetchData();
  }
}

