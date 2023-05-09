import { Injectable } from '@angular/core';
import { Instructor } from './instructor';
import { Course } from './course';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { map } from 'rxjs';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { ScheduleService } from './schedule.service';
import { Course_Meeting } from './course_meeting';
import { EditInstructorComponent } from './edit-instructor/edit-instructor.component';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private scheduleService: ScheduleService
  ) {}

  nextInstID: number = 0;
  nextCourseID: number = 0;
  instructorList: Instructor[] = [];
  coursesList: Course[] = [];
  meetings: Course_Meeting[] = [];

  addInstructor(newInstructor: Instructor) {
    return this.http.put(
      'https://organize-it-140cc-default-rtdb.firebaseio.com/instructors/' +
        newInstructor.instructor_id +
        '.json',
      newInstructor
    );
  }

  addCourse(newCourse: Course) {
    return this.http.put(
      'https://organize-it-140cc-default-rtdb.firebaseio.com/courses/' +
        newCourse.course_id +
        '.json',
      newCourse
    );
  }

  getCourses() {
    return this.http
      .get<Course[]>(
        'https://organize-it-140cc-default-rtdb.firebaseio.com/' +
          'courses.json'
      )
      .pipe(
        map((responseData) => {
          const courseArray: Course[] = [];
          for (const key in responseData) {
            courseArray.push(responseData[key]);
          }
          this.nextCourseID = courseArray.length;
          this.coursesList = courseArray;
          return courseArray;
        })
      );
  }

  getCourse(id: any) {
    return this.coursesList[id];
  }

  getProf(id: any) {
    return this.instructorList[id];
  }

  getMeetings() {
    this.scheduleService.getMeetings().subscribe((data) => {
      this.meetings = data;
    });
  }

  getCourseMeetings(id: any){
    var output: Course_Meeting[] = [];
    for(var i = 0; i < this.meetings.length; i++){
      if(this.meetings[i].course == this.coursesList[id].course_id.toString()){
        output.push(this.meetings[i]);
      }
    }
    return output;
  }

  getInstructors() {
    return this.http
      .get<Instructor[]>(
        'https://organize-it-140cc-default-rtdb.firebaseio.com/' +
          'instructors.json'
      )
      .pipe(
        map((responseData) => {
          const instructorArray: Instructor[] = [];
          for (const key in responseData) {
            instructorArray.push(responseData[key]);
          }
          this.nextInstID = instructorArray.length;
          this.instructorList = instructorArray;
          return instructorArray;
        })
      );
  }

  newCoursesDialog() {
    const dialogRef = this.dialog.open(AddCourseComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  newInstructorsDialog() {
    const dialogRef = this.dialog.open(AddInstructorComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  newDialogView(course: Course) {
    const dialogRef = this.dialog.open(CourseDetailsComponent, {
      data: course,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  newDialogEdit(course: Course) {
    const dialogRef = this.dialog.open(EditCourseComponent, {
      data: course,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      location.reload();
    });
  }

  newDialogEditIns(instructor: Instructor) {
    const dialogRef = this.dialog.open(EditInstructorComponent, {
      data: instructor,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      location.reload();
    });
  }

  editCourse(course: Course) {
    return this.http.put(
      'https://organize-it-140cc-default-rtdb.firebaseio.com/courses/' +
        course.course_id +
        '.json',
      course
    );
  }

  deleteCourse(id: number) {
    return this.http.delete(
      'https://organize-it-140cc-default-rtdb.firebaseio.com/courses/' +
        id +
        '.json'
    );
  }

  editInstructor(instructor: Instructor) {
    return this.http.put(
      'https://organize-it-140cc-default-rtdb.firebaseio.com/instructors/' +
        instructor.instructor_id +
        '.json',
      instructor
    );
  }

  deleteInstructor(id: number) {
    return this.http.delete(
      'https://organize-it-140cc-default-rtdb.firebaseio.com/instructors/' +
        id +
        '.json'
    );
  }
}
