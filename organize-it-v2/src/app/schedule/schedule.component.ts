import { Component, OnInit } from '@angular/core';
import { Schedule } from '../schedule';
import { ScheduleService } from '../schedule.service';
import { Event } from '../event';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  days: Schedule[] = [];
  currentDay: number = 0;
  futureDays: number[] = [];
  selectedDay: number = this.currentDay;
  selectedDate: Date = new Date();
  weekdays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  weekday: string = this.weekdays[this.selectedDay];
  month: string = this.months[this.selectedDate.getMonth()];

  constructor(private scheduleService: ScheduleService) {}

  getDayLetter(num: number) {
    switch(num){
      case 0:
      case 6:
        return "S";
      case 1:
        return "M";
      case 2:
      case 4:
        return "T";
      case 3:
        return "W";
      case 5:
        return "F";
      default:
        return "";
    }
  }

  getVariables() {
    var today = new Date();
    this.currentDay = today.getDay();
    var temp = today.getDay()+1;
    for(var i = 0; i < 6; i++){
      if(temp == 6){
        this.futureDays.push(temp);
        temp = 0;
      } else {
        this.futureDays.push(temp);
        temp++;
      }
    }
  }

  colorDays(){
    var days = Array.from(document.getElementsByClassName("sch-day") as HTMLCollectionOf<HTMLElement>);
    var colors = ["#ab43d4", "#edbf2a", "#fa5a4c", "#6fbe54", "#2d83ef", "#e28a1c", "#483cd1"];
    for(var i = 0; i < days.length; i++){
      days[i].style.backgroundColor = colors[i];
    }
  }

  newDialog() {
    this.scheduleService.newDialogAdd();
  }

  openDay(el: Element, day: number) {
    this.selectedDay = day;
    var i, tabcontent, tablinks;
    tabcontent = Array.from(document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>);
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    //document.getElementById(day)!.style.display = "block";
    el.className += " active";
  }

  ngOnInit(): void {
    this.getVariables();
  }
}