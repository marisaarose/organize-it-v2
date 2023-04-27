import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from '../task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  constructor(private taskService: TaskService, private fb: FormBuilder) {}

  newtask: Task = {
    task_id: this.taskService.nextID++,
    title: '',
    course: '',
    due_date: new Date,
    details: '',
    is_complete: false,
    is_pinned: false
  };

  taskForm = this.fb.group({
    title: ['', Validators.required],
    course: ['', Validators.required],
    due_date: ['', Validators.required],
    details: [''],
    is_pinned: ['']
  });

  onSubmit() {

  }
}
