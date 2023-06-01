import { mapToCanActivate, Routes } from '@angular/router';
import { userNewGuard } from './core/user-new.guard';
import { UserGuard } from './core/user.guard';
import { HomeComponent } from './pages/home/home.component';

export const approutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'trainings',
    canMatch: [userNewGuard],
    canLoad: [UserGuard],
    canActivate: mapToCanActivate([UserGuard]),
    loadChildren: () => import('./pages/trainings/trainings.module').then(m => m.TrainingsModule)
  }
];
