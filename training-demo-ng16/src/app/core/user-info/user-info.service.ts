import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserInfo } from './user-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  readonly userInfo: Observable<UserInfo>;
  readonly username: Observable<string>;

  constructor(private http: HttpClient) {
    const initialValue = {name: ''};
    this.userInfo = this.http.get<UserInfo>(environment.api + '/api/user.json')
      .pipe(
        catchError(() => of(initialValue)),
        shareReplay(1)
      );

    this.username = this.userInfo.pipe(map(user => user.name));
  }
}
