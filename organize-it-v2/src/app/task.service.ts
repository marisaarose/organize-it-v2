import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, public dialog: MatDialog) { }
  nextID: number = 0;

  newDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addTask(newTask: Task){
    return this.http.post('https://organize-it-140cc-default-rtdb.firebaseio.com/' + 'tasks.json', newTask);
  }

  getTasks() {
    return this.http.get<Task[]>('https://organize-it-140cc-default-rtdb.firebaseio.com/' + 'tasks.json')
    .pipe(map(responseData => {
      const taskArray: Task[]= [];
      for(const key in responseData){
        taskArray.push(responseData[key]);
      }
      return taskArray;
    }));
  }
}
