import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  nextID: number = 0;

  addTask(newTask: Task){
    return this.http.post('https://organize-it-140cc-default-rtdb.firebaseio.com/' + 'task.json', newTask);
  }
}
