export interface Bewertung {
  id: string;
  stars: number;
  comment?: string;
  trainingId: string;
  bewerter: string;
}
