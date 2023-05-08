import { Component, OnInit, Inject } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Event } from '../event';
@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css'],
})
export class ScheduleDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Event, private scheduleService: ScheduleService, private dialog: MatDialog) {}
  event: Event = this.data;
  viewid: string = "view-" + this.event.event_id;
  counter: number = 0;
  weekdays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  parsedDate: any = [];

  convertNotes() {
    var parser = new DOMParser();
    var currentNotes = this.event.notes;
    var element = document.querySelector("#" + this.viewid + ' .event-notes')!;
    while(this.counter < 1){
      element.appendChild(parser.parseFromString(currentNotes, 'text/html').body);
      this.counter++;
    }
  }

  editEvent() {
    this.scheduleService.newDialogEdit(this.data);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteEDialog, {
      data: this.event,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      location.reload();
    });
  }

  getDateString(){
    var parsed = this.event.date.toString();
    this.parsedDate = parsed.split('-');
    var temp = new Date();
    temp.setFullYear(Number.parseInt(this.parsedDate[0]));
    temp.setMonth(Number.parseInt(this.parsedDate[1])-1);
    temp.setDate(Number.parseInt(this.parsedDate[2]));
    var day = this.weekdays[temp.getDay()];
    return day + ", " + this.months[temp.getMonth()] + " " + temp.getDate() + ", " + temp.getFullYear();
  }

  getTimeString(){
    var start = '' + this.event.start_time + '';
    var end = '' + this.event.end_time + '';
    var starthalf = 'PM';
    var endhalf = 'PM';
    var starthour = Number.parseInt(start.split(':')[0]);
    var endhour = Number.parseInt(end.split(':')[0]);
    if(Number.parseInt(start.split(':')[0]) < 12){
      starthalf = 'AM';
    } else {
      starthour = Number.parseInt(start.split(':')[0]) % 12;
    }
    if(Number.parseInt(end.split(':')[0]) < 12){
      endhalf = 'AM';
    } else {
      endhour = Number.parseInt(end.split(':')[0]) % 12;
    }

    return "from " + starthour + ":" + start.split(':')[1] + " " + starthalf + " to " + endhour + ":" + end.split(':')[1] + " " + endhalf;
  }


  ngOnInit(): void {
  }
}

@Component({
  selector: 'delete-edialog',
  template: `<mat-dialog-content>
  <h1 mat-dialog-title>Delete Event</h1>
  <div mat-dialog-content>Are you sure you would like to delete this event?</div>
  <div mat-dialog-actions style="display:flex;">
    <button mat-stroked-button color="basic" [mat-dialog-close]="true">No</button>
    <button mat-stroked-button color="warn" [mat-dialog-close]="true" (click)='this.deleteEvent()'>Yes</button>
  </div>
  </mat-dialog-content>
  `,
})
export class DeleteEDialog {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Event, public dialogRef: MatDialogRef<DeleteEDialog>, private scheduleService: ScheduleService) {}

  deleteEvent(){
    this.scheduleService.deleteEvent(Number(this.data.event_id)).subscribe();
  }
}