import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingsDetailComponent } from './training-detail/trainings-detail.component';
import { TrainingOverviewComponent } from './training-overview/training-overview.component';

const routes: Routes = [
  {path: '', component: TrainingOverviewComponent},
  {path: ':id', component: TrainingsDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingsRoutingModule {
}
