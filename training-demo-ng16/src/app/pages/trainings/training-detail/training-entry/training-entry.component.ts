import { Component, Input } from '@angular/core';
import { TrainingWithBewertung } from '../../state/training.model';

@Component({
  selector: 'app-training-entry',
  templateUrl: './training-entry.component.html',
  styleUrls: ['./training-entry.component.scss']
})
export class TrainingEntryComponent {

  @Input() training?: TrainingWithBewertung;

}
