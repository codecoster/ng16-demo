import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TrainingWithBewertungService } from '../state/training-with-bewertung.service';

import { TrainingOverviewComponent } from './training-overview.component';

describe('TrainingOverviewComponent', () => {
  let component: TrainingOverviewComponent;
  let fixture: ComponentFixture<TrainingOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingOverviewComponent],
      providers: [{provide: TrainingWithBewertungService, useValue: {allTrainings: signal([])}}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
