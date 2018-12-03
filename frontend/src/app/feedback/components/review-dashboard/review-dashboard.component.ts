import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nwcdkpi-review-dashboard',
  templateUrl: './review-dashboard.component.html',
  styleUrls: ['./review-dashboard.component.scss']
})
export class ReviewDashboardComponent implements OnInit {
  feedbackToOthers = ['feedback to zhangsan', 'feedback to li si'];
  completedFeedbacks = ['feedback to wangwu'];
  constructor() {}

  ngOnInit() {}
}
