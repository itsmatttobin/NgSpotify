import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private loginUrl: string;

  constructor(
    private userService: UserService
  ) {
    this.loginUrl = environment.loginUrl;
  }

  ngOnInit() {
  }

}
