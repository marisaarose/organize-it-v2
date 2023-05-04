import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../task.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from '../task';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Task, private taskService: TaskService, private courseService: CourseService, private fb: FormBuilder) {}
  
  course: Course[];

  updtask: Task = {
    task_id: this.data.task_id,
    title: '',
    course: '',
    due_date: new Date,
    details: '',
    is_complete: false,
    is_pinned: false
  };

  editTForm = this.fb.group({
    title: [this.data.title, Validators.required],
    course: [this.data.course, Validators.required],
    due_date: [this.data.due_date, Validators.required],
    details: [this.data.details],
    is_pinned: [this.data.is_pinned, Validators.required]
  });

  updateValues() {
    this.updtask.title = this.editTForm.value.title!;
    this.updtask.course = this.editTForm.value.course!;
    this.updtask.due_date = this.editTForm.value.due_date!;
    this.updtask.details = this.editTForm.value.details!;
    this.updtask.is_pinned = Boolean(this.editTForm.value.is_pinned!);
  }

  editTask() {
    this.taskService.editTask(this.updtask).subscribe();
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



