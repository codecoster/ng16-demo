import { Component, inject } from '@angular/core';
import { TrainingWithBewertungService } from '../state/training-with-bewertung.service';

@Component({
  selector: 'app-training-overview',
  templateUrl: './training-overview.component.html',
  styleUrls: ['./training-overview.component.scss']
})
export class TrainingOverviewComponent {
  private readonly trainingService = inject(TrainingWithBewertungService);
  trainingsWithBewertungen = this.trainingService.allTrainings;
}
