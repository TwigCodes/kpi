import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatersContainerComponent } from './components/raters-container/raters-container.component';
import { ReviewContainerComponent } from './components/review-container/review-container.component';

const routes: Routes = [
  {
    path: 'raters',
    component: RatersContainerComponent,
    data: { title: 'nwcdkpi.menu.feedback.raters' }
  },
  {
    path: 'review',
    component: ReviewContainerComponent,
    data: { title: 'nwcdkpi.menu.feedback.review' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {}
