import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { map } from 'rxjs';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient, public dialog: MatDialog) {}
  nextID: number = 0;
  tasks: Task[];
  task_keys: any[] = [];

  newDialogAdd() {
    const dialogRef = this.dialog.open(AddTaskComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  newDialogEdit(task: Task) {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: task,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      location.reload();
    });
  }

  newDialogView(task: Task) {
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      data: task,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addTask(newTask: Task) {
    return this.http.put(
      'https://organize-it-140cc-default-rtdb.firebaseio.com/tasks/' +
        newTask.task_id +
        '.json',
      newTask
    );
  }

  editTask(task: Task) {
    return this.http.put(
      'https://organize-it-140cc-default-rtdb.firebaseio.com/tasks/' +
        task.task_id +
        '.json',
      task
    );
  }

  deleteTask(id: number) {
    return this.http.delete(
      'https://organize-it-140cc-default-rtdb.firebaseio.com/tasks/' +
        id +
        '.json'
    );
  }

  getTasks() {
    return this.http
      .get<Task[]>(
        'https://organize-it-140cc-default-rtdb.firebaseio.com/' + 'tasks.json'
      )
      .pipe(
        map((responseData) => {
          const taskArray: Task[] = [];
          for (const key in responseData) {
            taskArray.push(responseData[key]);
          }
          this.nextID = (taskArray[taskArray.length-1].task_id)+1;
          this.tasks = taskArray;
          return taskArray;
        })
      );
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

  parseDate(due: Date) {
    var date_string = due.toString();
    var year = date_string.split('-')[0];
    var month = date_string.split('-')[1];
    var day = date_string.split('-')[2];
    var dateArray = [month, day, year];
    return dateArray;
  }

}
