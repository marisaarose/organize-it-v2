import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Event } from '../event';
import { ScheduleService } from '../schedule.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Event, private scheduleService: ScheduleService, private fb: FormBuilder) {}

  updevent: Event = {
    event_id: this.data.event_id,
    title: '',
    date: new Date,
    start_time: {hours:0, minutes:0},
    end_time: {hours:0, minutes:0},
    notes: ''
  };

  editEForm = this.fb.group({
    title: [this.data.title, Validators.required],
    date: [this.data.date, Validators.required],
    start_time: [this.data.start_time, Validators.required],
    end_time: [this.data.end_time, Validators.required],
    notes: [this.data.notes]
  });

  updateValues() {
    this.updevent.title = this.editEForm.value.title!;
    this.updevent.date = this.editEForm.value.date!;
    this.updevent.start_time = this.editEForm.value.start_time!;
    this.updevent.end_time = this.editEForm.value.end_time!;
    this.updevent.notes = this.editEForm.value.notes!;
  }

  editEvent() {
    this.scheduleService.editEvent(this.updevent).subscribe();
  }

  onSubmit() {
    this.updateValues();
    this.editEvent();
  }

  ngOnInit(): void {
  }
}
