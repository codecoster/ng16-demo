import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { convertToMap } from '../../../shared/simple-helper.functions';
import { Training } from './training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private trainings = new BehaviorSubject<{ [id: string]: Training }>({});

  constructor(private http: HttpClient) {
  }

  getTrainings(): Observable<{ [id: string]: Training }> {
    this.http.get<Training[]>(environment.api + '/api/trainings.json')
      .subscribe(
        trainings => this.trainings.next(convertToMap(trainings)),
        err => this.trainings.error(err.message)
      );
    return this.trainings.asObservable();
  }
}
