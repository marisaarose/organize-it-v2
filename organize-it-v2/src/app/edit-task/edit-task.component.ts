import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../task.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from '../task';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  constructor(private taskService: TaskService, private courseService: CourseService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) task: Task) {}

  course: Course[];

  updtask: Task = {
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
    due_date: [new Date, Validators.required],
    details: [''],
    is_pinned: [false, Validators.required]
  });

  updateValues() {
    this.updtask.title = this.taskForm.value.title!;
    this.updtask.course = this.taskForm.value.course!;
    this.updtask.due_date = this.taskForm.value.due_date!;
    this.updtask.details = this.taskForm.value.details!;
    this.updtask.is_pinned = Boolean(this.taskForm.value.is_pinned!);
  }

  editTask() {
    this.taskService.addTask(this.updtask).subscribe(data => {
      console.log(data);
    })
  }

  getCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.course = data;
    })
  }

  onSubmit() {
    this.updateValues();
    this.editTask();
  }

  ngOnInit(): void {
    this.getCourses();
  }
}



