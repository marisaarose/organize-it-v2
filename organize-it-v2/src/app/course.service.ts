import { Injectable } from '@angular/core';
import { Instructor } from './instructor';
import { Course } from './course';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  nextInstID: number = 0;
  nextCourseID: number = 0;
  instructorList: Instructor[];

  addInstructor(newInstructor: Instructor){
    return this.http.post('https://organize-it-140cc-default-rtdb.firebaseio.com/' + 'instructors.json', newInstructor);
  }

  addCourse(newCourse: Course) {
    return this.http.post('https://organize-it-140cc-default-rtdb.firebaseio.com/' + 'courses.json', newCourse);
  }

  getCourses() {
    return this.http.get<Course[]>('https://organize-it-140cc-default-rtdb.firebaseio.com/' + 'courses.json')
    .pipe(map(responseData => {
      const courseArray: Course[]= [];
      for(const key in responseData){
        courseArray.push(responseData[key]);
      }
      this.nextCourseID = courseArray.length;
      return courseArray;
    }));
  }

  getInstructors() {
    return this.http.get<Instructor[]>('https://organize-it-140cc-default-rtdb.firebaseio.com/' + 'instructors.json')
    .pipe(map(responseData => {
      const instructorArray: Instructor[]= [];
      for(const key in responseData){
        instructorArray.push(responseData[key]);
      }
      this.nextInstID = instructorArray.length;
      return instructorArray;
    }));
  }

  newCoursesDialog() {
    const dialogRef = this.dialog.open(AddCourseComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  newInstructorsDialog() {
    const dialogRef = this.dialog.open(AddInstructorComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
