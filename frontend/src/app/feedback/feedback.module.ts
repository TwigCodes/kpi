import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FeedbackRoutingModule } from './feedback-routing.module';

import * as fromFeedback from './feedback.reducer';
import { FeedbackEffects } from './feedback.effects';

import { RatersContainerComponent } from './components/raters-container/raters-container.component';
import { SharedModule } from '@app/shared';
import { RaterDialogComponent } from './components/rater-dialog/rater-dialog.component';
import { ReviewContainerComponent } from './components/review-container/review-container.component';
import { ReviewItemComponent } from './components/review-item/review-item.component';

@NgModule({
  declarations: [
    RatersContainerComponent,
    RaterDialogComponent,
    ReviewContainerComponent,
    ReviewItemComponent
  ],
  imports: [
    SharedModule,
    FeedbackRoutingModule,
    StoreModule.forFeature('feedback', fromFeedback.reducer),
    EffectsModule.forFeature([FeedbackEffects])
  ],
  entryComponents: [RaterDialogComponent]
})
export class FeedbackModule {}
