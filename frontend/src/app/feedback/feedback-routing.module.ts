import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatersContainerComponent } from './components/raters-container/raters-container.component';
import { ReviewDashboardComponent } from './components/review-dashboard/review-dashboard.component';

const routes: Routes = [
  {
    path: 'raters',
    component: RatersContainerComponent,
    data: { title: 'nwcdkpi.menu.feedback.raters' }
  },
  {
    path: 'reviewdashboard',
    component: ReviewDashboardComponent,
    data: { title: 'nwcdkpi.feedback.dashboard' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {}
