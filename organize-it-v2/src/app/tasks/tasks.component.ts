import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(private taskService: TaskService, private courseService: CourseService) {}
  @Input() task: Task;
  courseName: string = "";

  getCourseName(){
    this.courseName = this.courseService.getCourse(this.task.course).name;
    return this.courseName;
  }

  getDueString(){
    var today = new Date();
    var due = new Date(this.task.due_date);
    var diff = Math.abs(today.getTime() - due.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
    if(today.getMonth()+1 > due.getMonth()+1 && today.getFullYear() == due.getFullYear()){
      return "Due " + (due.getMonth()+1) + "/" + (due.getDate()+1) + " - Overdue"; 
    }
    return "Due " + (due.getMonth()+1) + "/" + (due.getDate()+1) + " - " + diffDays + " days left";
  }
  
  editTask(){
    this.taskService.newDialogEdit(this.task);
  }

  deleteTask(){
    
  }

  ngOnInit(): void {
  }
}
