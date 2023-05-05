import { Component, OnInit, Input, Inject } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { ThisReceiver } from '@angular/compiler';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(private taskService: TaskService, private courseService: CourseService, private dialog: MatDialog) {}
  @Input() task: Task;
  courseName: string = "";
  courseColor: string = "";
  parsedDate: any = [];
  todayDate: any = [];


  getCourseName(){
    this.courseName = this.courseService.getCourse(this.task.course).name;
    return this.courseName;
  }

  getCourseColor(){
    this.courseColor = this.courseService.getCourse(this.task.course).color;
    return this.courseColor;
  }

  parseDate() {
    var date_string = this.task.due_date.toString();
    var year = date_string.split('-')[0];
    var month = date_string.split('-')[1];
    var day = date_string.split('-')[2];
    var dateArray = [month, day, year];
    this.parsedDate = dateArray;
  }

  getDueString(){
    if(this.task.is_complete){
      return "";
    }
    this.parseDate();
    var today = new Date();
    this.todayDate.push(today.getMonth()+1, today.getDate(), today.getFullYear());
    if(today.getMonth()+1 < 10){
      this.todayDate[0] = "0" + (today.getMonth()+1);
    }
    if(today.getDate() < 10){
      this.todayDate[1] = "0" + (today.getDate());
    }
    var todayDay = this.getYearDay(this.todayDate) + today.getDate();
    var dueDay = this.getYearDay(this.parsedDate) + Number.parseInt(this.parsedDate[1]);
    var difference = dueDay - todayDay;
    if(difference < 0){
      return "Due " + this.parsedDate[0] + "/" + this.parsedDate[1] + " - Overdue"; 
    } else if(difference == 0){
      return "Due " + this.parsedDate[0] + "/" + this.parsedDate[1] + " - Today"; 
    } else {
      return "Due " + this.parsedDate[0] + "/" + this.parsedDate[1] + " - " + difference + " days left"; 
    }
  }

  getYearDay(date: any) {
    var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var days = 0;
    var numberedMonth = date[0];
    if(date[0] == String){
      numberedMonth = Number.parseInt(date[0]);
    }
    if(date[2] % 4 == 0){
      days += 1;
    }
    for(var i = 0; i < numberedMonth; i++){
      days += months[i];
    }
    return days;
  }
  
  editTask(){
    this.taskService.newDialogEdit(this.task);
  }

  viewTask(){
    this.taskService.newDialogView(this.task);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CompleteDialog, {
      data: this.task,
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngOnInit(): void {
  }
}

@Component({
  selector: 'complete-dialog',
  template: `<mat-dialog-content>
  <h1 mat-dialog-title>Complete Task</h1>
  <div mat-dialog-content>You wish to mark this task as completed?</div>
  <div mat-dialog-actions style="display:flex;">
    <button mat-stroked-button color="basic" [mat-dialog-close]="true">No</button>
    <button mat-stroked-button color="primary" [mat-dialog-close]="true" (click)='this.completeTask()'>Yes</button>
  </div>
  </mat-dialog-content>
  `,
})
export class CompleteDialog {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Task, public dialogRef: MatDialogRef<CompleteDialog>, private taskService: TaskService) {}

  completeTask(){
    var newTask = this.data;
    newTask.is_complete = true;
    document.getElementById(this.data.task_id.toString())!.classList.add('green-completed');
    document.getElementById(this.data.task_id.toString())!.innerHTML = "<mat-icon>check</mat-icon>";

    this.taskService.editTask(newTask).subscribe();
    this.taskService.getTasks().subscribe();
  }

  deleteTask(){
    this.taskService.deleteTask(Number(this.data.task_id)).subscribe();
  }
}