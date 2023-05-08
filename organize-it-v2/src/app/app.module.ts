import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { TasksComponent, CompleteDialog } from './tasks/tasks.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { MatButtonModule } from '@angular/material/button'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'; 
import {MatIconModule} from '@angular/material/icon';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskDetailsComponent, DeleteDialog } from './task-details/task-details.component';
import { ScheduleDetailComponent, DeleteEDialog } from './schedule-detail/schedule-detail.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddCourseMeetingComponent } from './add-course-meeting/add-course-meeting.component';
import { EditEventComponent } from './edit-event/edit-event.component';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    TasksComponent,
    ScheduleComponent,
    DashboardComponent,
    TaskListComponent,
    AddTaskComponent,
    AddInstructorComponent,
    AddCourseComponent,
    CourseListComponent,
    EditTaskComponent,
    TaskDetailsComponent,
    DeleteDialog, 
    CompleteDialog,
    ScheduleDetailComponent,
    AddEventComponent,
    AddCourseMeetingComponent,
    EditEventComponent,
    DeleteEDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
