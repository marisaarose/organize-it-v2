import { Component, Input } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  @Input() course: Course;

  constructor(private courseService: CourseService) {}

  viewCourse(){
    this.courseService.newDialogView(this.course);
  }
}
