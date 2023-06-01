import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../user-info/user-info.model';
import { UserInfoService } from '../user-info/user-info.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userInfo?: Observable<UserInfo>;

  constructor(private readonly userService: UserInfoService) {
  }

  ngOnInit(): void {
    this.userInfo = this.userService.userInfo;
  }

}
