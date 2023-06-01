import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BewertungService } from '../../shared/bewertung/bewertung.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bewertungDurchnitt?: Observable<number>;

  constructor(private readonly bewertungService: BewertungService) {
  }

  ngOnInit(): void {
    this.bewertungDurchnitt = this.bewertungService.getDurchschnittsBewertung();
  }
}
