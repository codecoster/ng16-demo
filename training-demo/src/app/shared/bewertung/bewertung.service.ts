import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, onErrorResumeNext, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ErrorNotifierService } from '../../core/error-notifier/error-notifier.service';
import { Bewertung } from './bewertung.model';

@Injectable({
  providedIn: 'root'
})
export class BewertungService {
  private bewertungen = new BehaviorSubject<Bewertung[]>([]);

  constructor(private readonly http: HttpClient,
              private readonly modalService: ErrorNotifierService) {
  }

  getBewertungen(): Observable<Bewertung[]> {
    this.http.get<Bewertung[]>(environment.api + '/api/bewertungs.json')
      .subscribe(bew => this.bewertungen.next(bew));
    return this.bewertungen.asObservable();
  }

  addBewertung(bewertung: Bewertung): Observable<Bewertung[]> {
    // http post request
    return of([
      ...this.bewertungen.value,
      {
        ...bewertung,
        id: `b${Math.ceil(Math.random() * 1e9)}`
      }
    ]).pipe(
      switchMap(res => Math.random() < 0.8 ? of(res) : throwError(new Error('Bewertung: An error happened'))),
      tap(
        res => this.bewertungen.next(res),
        err => this.modalService.openErrorModal(err.message)
      ),
      onErrorResumeNext(of([]))
    );

  }

  getDurchschnittsBewertung(): Observable<number> {
    return this.getBewertungen()
      .pipe(
        map(bewertungen => bewertungen
          .reduce((prev, curr) => prev + curr.stars, 0) / bewertungen.length)
      );
  }
}
