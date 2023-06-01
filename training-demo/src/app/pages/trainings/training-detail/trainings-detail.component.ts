import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserInfoService } from '../../../core/user-info/user-info.service';
import { Bewertung } from '../../../shared/bewertung/bewertung.model';
import { truthy } from '../../../shared/simple-helper.functions';
import { StarRating } from '../../../shared/stars-input/stars-input.component';
import { TrainingWithBewertungService } from '../state/training-with-bewertung.service';
import { TrainingWithBewertung } from '../state/training.model';

@Component({
  selector: 'app-trainings-detail',
  templateUrl: './trainings-detail.component.html',
  styleUrls: ['./trainings-detail.component.scss']
})
export class TrainingsDetailComponent implements OnInit {

  trainingWithBewertung?: Observable<TrainingWithBewertung>;
  bewertungForm = new FormGroup({
    stars: new FormControl<StarRating>(0, {nonNullable: true}),
    comment: new FormControl<string>('')
  });

  private user?: Observable<string>;

  constructor(private readonly route: ActivatedRoute,
              private readonly userInfoService: UserInfoService,
              private readonly trainingWithBewertungService: TrainingWithBewertungService) {
  }

  ngOnInit(): void {
    this.trainingWithBewertung = this.route.paramMap
      .pipe(
        map(params => params.get('id') || ''),
        switchMap(id => this.trainingWithBewertungService.getTrainingWithBewertung(id)),
        filter(truthy)
      );
    this.user = this.userInfoService.username;
  }

  sendFeedback(trainingId?: string): void {
    this.user?.pipe(
      first(),
      mergeMap(user => {
        const bewertung = {
          id: '',
          bewerter: user,
          ...this.bewertungForm.value,
          trainingId
        };
        return this.trainingWithBewertungService.addBewertung(bewertung as Bewertung);
      })
    )
      .subscribe(() => this.bewertungForm.reset());
  }

}
