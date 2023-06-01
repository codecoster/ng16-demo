import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { convertToMap } from '../../../shared/simple-helper.functions';
import { Training } from './training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http: HttpClient) {
  }

  getTrainings(): Observable<{ [id: string]: Training }> {
    return this.http.get<Training[]>(environment.api + '/api/trainings.json')
      .pipe(map(convertToMap));
  }
}
