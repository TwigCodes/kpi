import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FeedbackRoutingModule } from './feedback-routing.module';

import * as fromFeedback from './feedback.reducer';
import { FeedbackEffects } from './feedback.effects';

import { RatersContainerComponent } from './components/raters-container/raters-container.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [RatersContainerComponent],
  imports: [
    SharedModule,
    FeedbackRoutingModule,
    StoreModule.forFeature('feedback', fromFeedback.reducer),
    EffectsModule.forFeature([FeedbackEffects])
  ]
})
export class FeedbackModule {}
