import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatersContainerComponent } from './components/raters-container/raters-container.component';

const routes: Routes = [
  {
    path: 'feedback',
    component: RatersContainerComponent,
    data: { title: 'nwcdkpi.menu.feedback' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {}
