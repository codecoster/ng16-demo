import { Bewertung } from '../../../shared/bewertung/bewertung.model';
import { TrainingWithBewertung } from './training.model';

export function upsertBewertungToTraining(bewertung: Bewertung, trainingWithBewertung: TrainingWithBewertung): TrainingWithBewertung {
  if (trainingWithBewertung.bewertungen) {
    trainingWithBewertung.bewertungen.push(bewertung);
    return trainingWithBewertung;
  }
  return {...trainingWithBewertung, bewertungen: [bewertung]};
}
