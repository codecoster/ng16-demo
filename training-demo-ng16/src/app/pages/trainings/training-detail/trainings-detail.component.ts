import { Component, Input, OnChanges, OnInit, Signal, SimpleChanges } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserInfoService } from '../../../core/user-info/user-info.service';
import { Bewertung } from '../../../shared/bewertung/bewertung.model';
import { StarRating } from '../../../shared/stars-input/stars-input.component';
import { TrainingWithBewertungService } from '../state/training-with-bewertung.service';
import { TrainingWithBewertung } from '../state/training.model';

@Component({
  selector: 'app-trainings-detail',
  templateUrl: './trainings-detail.component.html',
  styleUrls: ['./trainings-detail.component.scss']
})
export class TrainingsDetailComponent implements OnChanges {

  @Input() id!: string;

  trainingWithBewertung?: Signal<TrainingWithBewertung | undefined>;
  bewertungForm = new FormGroup({
    stars: new FormControl<StarRating>(0, {nonNullable: true}),
    comment: new FormControl()
  });

  private user: Signal<string>;

  constructor(private readonly route: ActivatedRoute,
              private readonly userInfoService: UserInfoService,
              private readonly trainingWithBewertungService: TrainingWithBewertungService) {
    this.user = toSignal(this.userInfoService.username, {initialValue: ''});
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.trainingWithBewertung = this.trainingWithBewertungService.getTrainingWithBewertung(this.id);
  }

  sendFeedback(trainingId?: string): void {
    const bewertung = {
      id: '',
      bewerter: this.user(),
      ...this.bewertungForm.value,
      trainingId
    };
    this.trainingWithBewertungService.addBewertung(bewertung as Bewertung)
      .subscribe(() => this.bewertungForm.reset());
  }

}
