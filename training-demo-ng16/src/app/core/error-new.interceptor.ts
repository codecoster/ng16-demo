import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const errorNewInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req)
    .pipe(tap({error: err => console.error('new' + err.message)}));
};
