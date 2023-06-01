import { HttpClient } from '@angular/common/http';
import { computed, effect, Injectable, Signal, signal } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { onErrorResumeNext, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ErrorNotifierService } from '../../core/error-notifier/error-notifier.service';
import { Bewertung } from './bewertung.model';

@Injectable({
  providedIn: 'root'
})
export class BewertungService {
  private bewertungen = signal<Bewertung[]>([]);

  readonly allBewertungen = this.bewertungen.asReadonly();
  readonly durchschnittsBewertung = computed(() => {
    return this.bewertungen().reduce((prev, curr) => prev + curr.stars, 0)
      / this.bewertungen().length;
  });

  constructor(private readonly http: HttpClient,
              private readonly modalService: ErrorNotifierService) {
    this.initBewertungen();
  }

  initBewertungen() {
    this.http.get<Bewertung[]>(environment.api + '/api/bewertungs.json')
      .subscribe({
        next: bew => this.bewertungen.set(bew),
        error: () => undefined
      });
  }

  addBewertung(bewertung: Bewertung): Observable<Bewertung> {
    // http post request
    return of({
      ...bewertung,
      id: `b${Math.ceil(Math.random() * 1e9)}`
    }).pipe(
      switchMap(res => Math.random() < 0.8 ? of(res) : throwError(new Error('Bewertung: An error happened'))),
      tap(
        res => this.bewertungen.mutate(bew => bew.push(res)),
        err => this.modalService.openErrorModal(err.message)
      ),
      onErrorResumeNext(EMPTY)
    );
  }
}
