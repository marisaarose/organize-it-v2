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
  tasks: Task[];

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
      this.nextID = taskArray.length;
      this.tasks = taskArray;
      return taskArray;
    }));
  }

  getTask(id: number) {
    return this.tasks[id];
  }

  getPinned(): Task[] {
    var pinnedTasks: Task[] = [];
    for(var i = 0; i < this.tasks.length; i++){
      if(this.tasks[i].is_pinned == true){
        pinnedTasks.push(this.tasks[i]);
      }
    }
    return pinnedTasks;
  }

}
