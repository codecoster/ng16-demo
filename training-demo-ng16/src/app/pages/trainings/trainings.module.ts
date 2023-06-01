import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BewertungInputComponent } from '../../shared/bewertung/bewertung-input/bewertung-input.component';
import { TrainingEntryComponent } from './training-detail/training-entry/training-entry.component';
import { TrainingsDetailComponent } from './training-detail/trainings-detail.component';
import { TrainingOverviewComponent } from './training-overview/training-overview.component';

import { TrainingsRoutingModule } from './trainings-routing.module';


@NgModule({
  declarations: [
    TrainingsDetailComponent,
    TrainingEntryComponent,
    TrainingOverviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    TrainingsRoutingModule,
    BewertungInputComponent
  ]
})
export class TrainingsModule {
}
