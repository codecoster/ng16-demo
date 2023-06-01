import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Bewertung } from '../../../shared/bewertung/bewertung.model';
import { BewertungService } from '../../../shared/bewertung/bewertung.service';
import { Training, TrainingWithBewertung } from './training.model';
import { upsertBewertungToTraining } from './training-with-bewertung.helper';
import { TrainingService } from './training.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingWithBewertungService {

  private trainingsMap = this.trainingService.getTrainings();

  constructor(private trainingService: TrainingService, private bewertungService: BewertungService) {
  }

  getTrainings(): Observable<TrainingWithBewertung[]> {
    return combineLatest([this.bewertungService.getBewertungen(), this.trainingsMap])
      .pipe(
        // delay(2000),
        map(([bewertungen, trainingsWithBewertungMap]) => {
          return this.combineAllTrainingsWithBewertung(trainingsWithBewertungMap, bewertungen);
        })
      );
  }

  getTrainingWithBewertung(id: string): Observable<TrainingWithBewertung | undefined> {
    const trainingById = this.trainingsMap.pipe(map(trainingsmap => trainingsmap[id]));
    return combineLatest([this.bewertungService.getBewertungen(), trainingById])
      .pipe(
        map(([bewertungen, trainingWithBew]) => {
          return this.combineTrainingWithBewertung(trainingWithBew, bewertungen);
        })
      );
  }

  addBewertung(bewertung: Bewertung): Observable<Bewertung[]> {
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

  private combineTrainingWithBewertung(trainingWithBew: Training, bewertungen: Bewertung[]): TrainingWithBewertung | undefined {
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
