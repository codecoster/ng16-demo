import { Component, OnInit } from '@angular/core';
import { TrainingWithBewertung } from '../state/training.model';
import { TrainingWithBewertungService } from '../state/training-with-bewertung.service';

@Component({
  selector: 'app-training-overview',
  templateUrl: './training-overview.component.html',
  styleUrls: ['./training-overview.component.scss']
})
export class TrainingOverviewComponent implements OnInit {

  trainingsWithBewertungen?: TrainingWithBewertung[];
  error?: string;
  loading?: boolean;

  constructor(private readonly trainingService: TrainingWithBewertungService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.trainingService.getTrainings()
      .subscribe(
        trainingsWithBewertungen => {
          this.trainingsWithBewertungen = trainingsWithBewertungen;
          this.loading = false;
        },
        err => {
          this.error = err;
          this.loading = false;
        }
      );
  }

}
