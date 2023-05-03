import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(private taskService: TaskService, private courseService: CourseService) {}
  @Input() task: Task;
  courseName: string = "";
  courseColor: string = "";


  getCourseName(){
    this.courseName = this.courseService.getCourse(this.task.course).name;
    return this.courseName;
  }

  getCourseColor(){
    this.courseColor = this.courseService.getCourse(this.task.course).color;
    return this.courseColor;
  }

  getDueString(){
    var today = new Date();
    var due = new Date(this.task.due_date);
    function daysBetween(today: Date, due: Date) {
      return Math.round(Math.abs((+today) - (+due))/8.64e7);
    }
    if(today.getMonth()+1 > due.getMonth()+1 && today.getFullYear() == due.getFullYear()){
      return "Due " + (due.getMonth()+1) + "/" + (due.getDate()+1) + " - Overdue"; 
    }
    return "Due " + (due.getMonth()+1) + "/" + (due.getDate()+1) + " - " + daysBetween(today, due) + " days left";
  }
  
  editTask(){
    this.taskService.newDialogEdit(this.task);
  }

  viewTask(){
    this.taskService.newDialogView(this.task);
  }

  completeTask(){

  }

  ngOnInit(): void {
    this.getCourseColor();
  }
}
