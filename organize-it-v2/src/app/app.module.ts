import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { TasksComponent } from './tasks/tasks.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    TasksComponent,
    ScheduleComponent,
    DashboardComponent,
    ScheduleDetailComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
