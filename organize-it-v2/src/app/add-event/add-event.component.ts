import { Component } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Event } from '../event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  constructor(private scheduleService: ScheduleService, private fb: FormBuilder) {}

  event: Event[];

  newevent: Event = {
    event_id: this.scheduleService.nextEvID++,
    title: '',
    date: new Date,
    start_time: {hours: 0, minutes: 0},
    end_time: {hours: 0, minutes: 0},
    notes: ''
  };

  eventForm = this.fb.group({
    title: ['', Validators.required],
    date: [new Date, Validators.required],
    start_time: [{hours: 0, minutes:0}],
    end_time: [{hours: 0, minutes:0}],
    notes: ['']
  });

  updateValues() {
    this.newevent.title = this.eventForm.value.title!;
    this.newevent.date = this.eventForm.value.date!;
    this.newevent.start_time = this.eventForm.value.start_time!;
    this.newevent.end_time = this.eventForm.value.end_time!;
    this.newevent.notes = this.eventForm.value.notes!;
  }

  addEvent() {
    this.scheduleService.addEvent(this.newevent).subscribe(data => {
    })
  }

  onSubmit() {
    this.updateValues();
    this.addEvent();
  }

  ngOnInit(): void {

  }
}
