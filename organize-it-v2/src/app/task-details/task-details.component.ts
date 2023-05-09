import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Task, private taskService: TaskService, private courseService: CourseService, private dialog: MatDialog) {}
  task: Task = this.data;
  courseName: string = "";
  courseColor: string = "";
  viewid: string = "view-" + this.task.task_id;
  counter: number = 0;
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

  convertDetails() {
    var parser = new DOMParser();
    var currentDetails = this.task.details;
    var element = document.querySelector("#" + this.viewid + ' .task-details')!;
    var i = 0;
    while(this.counter < 1){
      element.appendChild(parser.parseFromString(currentDetails, 'text/html').body);
      this.counter++;
    }
  }

  editTask() {
    this.taskService.newDialogEdit(this.data);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: this.task,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      location.reload();
    });
  }

  getDueString(){
    this.parsedDate = this.taskService.parseDate(this.task.due_date);
    var today = new Date();
    this.todayDate.push(today.getMonth()+1, today.getDate(), today.getFullYear());
    if(today.getMonth()+1 < 10){
      this.todayDate[0] = "0" + (today.getMonth()+1);
    }
    if(today.getDate() < 10){
      this.todayDate[1] = "0" + (today.getDate());
    }
    var todayDay = this.taskService.getYearDay(this.todayDate) + today.getDate();
    var dueDay = this.taskService.getYearDay(this.parsedDate) + Number.parseInt(this.parsedDate[1]);
    var difference = dueDay - todayDay;
    if(this.task.is_complete){
      return "Was due " + this.parsedDate[0] + "/" + this.parsedDate[1] + "/" + this.parsedDate[2];
    }
    if(difference < 0){
      return "Due " + this.parsedDate[0] + "/" + this.parsedDate[1] + " - Overdue"; 
    } else if(difference == 0){
      return "Due " + this.parsedDate[0] + "/" + this.parsedDate[1] + " - Today"; 
    } else {
      return "Due " + this.parsedDate[0] + "/" + this.parsedDate[1] + " - " + difference + " days left"; 
    }
  }


  ngOnInit(): void {
  }
}

@Component({
  selector: 'delete-dialog',
  template: `<mat-dialog-content>
  <h1 mat-dialog-title>Delete Task</h1>
  <div mat-dialog-content>Are you sure you would like to delete this task?</div>
  <div mat-dialog-actions style="display:flex;">
    <button mat-stroked-button color="basic" [mat-dialog-close]="true">No</button>
    <button mat-stroked-button color="warn" [mat-dialog-close]="true" (click)='this.deleteTask()'>Yes</button>
  </div>
  </mat-dialog-content>
  `,
})
export class DeleteDialog {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Task, public dialogRef: MatDialogRef<DeleteDialog>, private taskService: TaskService) {}

  deleteTask(){
    this.taskService.deleteTask(Number(this.data.task_id)).subscribe();
  }
}