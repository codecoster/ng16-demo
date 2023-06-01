import { Component, OnInit, Signal } from '@angular/core';
import { BewertungService } from '../../shared/bewertung/bewertung.service';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [NgIf, MatIconModule, DecimalPipe]
})
export class HomeComponent implements OnInit {
  bewertungDurchnitt?: Signal<number>;

  constructor(private readonly bewertungService: BewertungService) {
  }

  ngOnInit(): void {
    this.bewertungDurchnitt = this.bewertungService.durchschnittsBewertung;
  }
}
