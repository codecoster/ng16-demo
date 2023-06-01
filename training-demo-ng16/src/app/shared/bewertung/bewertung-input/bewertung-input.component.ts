import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { StarRating, StarsInputComponent } from '../../stars-input/stars-input.component';

@Component({
  selector: 'app-bewertung-input',
  standalone: true,
  templateUrl: './bewertung-input.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    StarsInputComponent
  ],
  styleUrls: ['./bewertung-input.component.scss']
})
export class BewertungInputComponent {

  @Input() bewertungForm?: FormGroup<{ stars: FormControl<StarRating>; comment: FormControl<string | null>; }>;
  @Output() emitBewertung = new EventEmitter<void>();

}
