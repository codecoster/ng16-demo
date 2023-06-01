import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserInfoService } from '../../../core/user-info/user-info.service';
import { TrainingWithBewertungService } from '../state/training-with-bewertung.service';

import { TrainingsDetailComponent } from './trainings-detail.component';

describe('TrainingsDetailComponent', () => {
  let component: TrainingsDetailComponent;
  let fixture: ComponentFixture<TrainingsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingsDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {paramMap: of(new Map([['id','123']]))}},
        {provide: TrainingWithBewertungService, useValue: {}},
        {provide: UserInfoService, useValue: {username: of('helene')}}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
