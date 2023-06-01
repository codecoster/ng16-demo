import { computed, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Bewertung } from '../../../shared/bewertung/bewertung.model';
import { BewertungService } from '../../../shared/bewertung/bewertung.service';
import { upsertBewertungToTraining } from './training-with-bewertung.helper';
import { Training, TrainingWithBewertung } from './training.model';
import { TrainingService } from './training.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingWithBewertungService {

  private trainingsMap = toSignal(this.trainingService.getTrainings());

  readonly allTrainings = computed(() => {
    // delay(2000),
    try {
      const trainings = this.trainingsMap();
      if (!trainings) {
        return {loading: true, data: null};
      }
      return {data: this.combineAllTrainingsWithBewertung(trainings, this.bewertungService.allBewertungen())};
    } catch (err) {
      return {data: null, error: err};
    }
  });

  constructor(private trainingService: TrainingService, private bewertungService: BewertungService) {
  }

  // getTrainings(): Observable<TrainingWithBewertung[]> {
  //   return this.trainingsMap
  //     .pipe(
  //       delay(2000),
  //       map(trainingsWithBewertungMap => {
  //         return this.combineAllTrainingsWithBewertung(trainingsWithBewertungMap, this.bewertungService.allBewertungen());
  //       })
  //     );
  // }

  getTrainingWithBewertung(id: string): Signal<TrainingWithBewertung | undefined> {
    return computed(() => {
      return this.combineTrainingWithBewertung(this.trainingsMap()?.[id], this.bewertungService.allBewertungen());
    });
  }

  addBewertung(bewertung: Bewertung): Observable<Bewertung> {
    return this.bewertungService.addBewertung(bewertung);
  }

  private combineAllTrainingsWithBewertung(trainingsMap: { [id: string]: Training },
                                           bewertungen: Bewertung[]): TrainingWithBewertung[] {
    const trainingsWithBewertungen = {...trainingsMap};
    bewertungen.forEach(bewertung => {
      const trainingWithBew = trainingsWithBewertungen[bewertung.trainingId];
      if (!trainingWithBew) {
        return;
      }
      trainingsWithBewertungen[bewertung.trainingId] = upsertBewertungToTraining(bewertung, trainingWithBew);
    });
    return Object.values(trainingsWithBewertungen);
  }

  private combineTrainingWithBewertung(trainingWithBew: Training | undefined, bewertungen: Bewertung[]): TrainingWithBewertung | undefined {
    if (!trainingWithBew) {
      return;
    }
    let training = trainingWithBew;
    bewertungen.forEach(bewertung => {
      if (training.id !== bewertung.trainingId) {
        return;
      }
      training = upsertBewertungToTraining(bewertung, training);
    });
    return training;
  }
}
