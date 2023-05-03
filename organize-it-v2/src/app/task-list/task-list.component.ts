import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskService) {}
  tasks: Task[] = [];
  active_tasks: Task[][] = [];
  active_ptasks: Task[] = [];
  active_ntasks: Task[] = [];
  complete_tasks: Task[] = [];

  newDialog() {
    this.taskService.newDialogAdd();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      this.getActiveTasks(data);
    })
  }

  getActiveTasks(tasks: Task[]) {
    for(var i = 0; i < tasks.length; i++){
      if(tasks[i].is_complete == true){
        this.complete_tasks.push(tasks[i]);
      } else if(tasks[i].is_pinned == true){
        this.active_ptasks.push(tasks[i]);
      } else {
        this.active_ntasks.push(tasks[i]);
      }
    }
  }

  ngOnInit(): void {
    this.getTasks();
  }
}
