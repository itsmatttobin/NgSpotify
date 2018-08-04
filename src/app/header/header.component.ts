import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  private links: Array<NavLink>;
  private userId: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.links = [
      {
        name: 'Dashboard',
        link: '/'
      },
      {
        name: 'Artists',
        link: '/artists'
      },
      {
        name: 'Tracks',
        link: '/tracks'
      }
    ];

    this.userId = this.userService.getUserProfile().id;
  }

  ngOnInit() {
  }

  private logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}

export interface NavLink {
  name: string;
  link: string;
}
