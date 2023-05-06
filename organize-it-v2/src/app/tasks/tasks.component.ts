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

  getDueString(){
    if(this.task.is_complete){
      return "";
    }
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
    if(difference < 0){
      return "Due " + this.parsedDate[0] + "/" + this.parsedDate[1] + " - Overdue"; 
    } else if(difference == 0){
      return "Due " + this.parsedDate[0] + "/" + this.parsedDate[1] + " - Today"; 
    } else {
      return "Due " + this.parsedDate[0] + "/" + this.parsedDate[1] + " - " + difference + " days left"; 
    }
  }
  
  editTask(){
    this.taskService.newDialogEdit(this.task);
  }

  viewTask(){
    this.taskService.newDialogView(this.task);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CompleteDialog, {
      data: this.task
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      location.reload();
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
  }
}