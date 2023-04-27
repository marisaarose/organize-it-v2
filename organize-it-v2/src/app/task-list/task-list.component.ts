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

  newDialog() {
    this.taskService.newDialog();
  }

  fetchData() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      console.log(data);
    })
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
