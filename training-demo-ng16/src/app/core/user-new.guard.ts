import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserInfoService } from './user-info/user-info.service';

export const userNewGuard: CanMatchFn = (route, segments) => {
  const userService = inject(UserInfoService);
  return userService.username.pipe(map(Boolean));
};
