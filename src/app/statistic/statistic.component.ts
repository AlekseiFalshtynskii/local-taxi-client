import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { QueueService } from '../service/queue.service';
import { TripService } from '../service/trip.service';
import { QueueStatistic } from '../model/queue-statistic';
import { TripStatistic } from '../model/trip-statistic';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  queueStatistic: QueueStatistic;

  tripStatistic: TripStatistic;

  constructor(private datePipe: DatePipe,
              private queueService: QueueService,
              private tripService: TripService) {
  }

  ngOnInit() {
    this.queueService.getStatistic().subscribe(
      response => {
        console.log(response);
        this.queueStatistic = response;
      },
      error => {
        console.log(error);
      }
    );
    this.tripService.getStatistic().subscribe(
      response => {
        console.log(response);
        this.tripStatistic = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  time(duration: number): string {
    return this.datePipe.transform(duration, 'HH:mm:ss', 'GMT');
  }
}
