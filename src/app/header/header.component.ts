import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { NavLink } from '../definitions/nav-link';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  private links: Array<NavLink>;
  private userId: string;
  private menuActive: boolean;

  constructor(
    private router: Router,
    private location: Location,
    private userService: UserService
  ) {
    this.links = [
      {
        name: 'Activity',
        link: '/'
      },
      {
        name: 'Tracks',
        link: '/tracks'
      },
      {
        name: 'Artists',
        link: '/artists'
      }
    ];

    this.userId = this.userService.getUserProfile().id;

    this.menuActive = false;
  }

  ngOnInit() {
  }

  private logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
