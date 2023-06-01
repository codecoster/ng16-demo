import { NgIf } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserInfo } from '../user-info/user-info.model';
import { UserInfoService } from '../user-info/user-info.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf]
})
export class NavComponent {

  userInfo: Signal<UserInfo | undefined>;

  constructor(private readonly userService: UserInfoService) {
    this.userInfo = toSignal(this.userService.userInfo);
  }

}
