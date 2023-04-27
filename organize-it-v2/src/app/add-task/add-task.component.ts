import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from '../task';
import { CourseService } from '../course.service';
import { Course } from '../course';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  constructor(private taskService: TaskService, private courseService: CourseService, private fb: FormBuilder) {}

  course: Course[];

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
    due_date: [new Date, Validators.required],
    details: [''],
    is_pinned: [Boolean, Validators.required]
  });

  updateValues() {
    this.newtask.title = this.taskForm.value.title!;
    this.newtask.course = this.taskForm.value.course!;
    this.newtask.due_date = this.taskForm.value.due_date!;
    this.newtask.details = this.taskForm.value.details!;
    this.newtask.is_pinned = Boolean(this.taskForm.value.is_pinned!);
  }

  addTask() {
    this.taskService.addTask(this.newtask).subscribe(data => {
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
    this.addTask();
  }

  ngOnInit(): void {
    this.getCourses();
  }
}
