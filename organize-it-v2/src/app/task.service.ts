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

  completedDialog(task: Task) {
    const dialogRef = this.dialog.open(AddTaskComponent);
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
          var i = 0;
          for (const key in responseData) {
            taskArray.push(responseData[key]);
          }
          this.nextID = taskArray.length;
          this.tasks = taskArray;
          return taskArray;
        })
      );
  }

  getTask(id: number) {
    return this.tasks[id];
  }

}
