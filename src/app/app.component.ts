import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    const itemId = 'ng-spotify-access-token';
    const accessToken = localStorage.getItem(itemId);

    if (accessToken) {

      this.userService.setLoggedInUser(accessToken)
        .then(response => {
          console.log('Logged in', response);
        })
        .catch(error => {
          console.error('ERROR:', error);
        });

    } else {

      this.route.queryParams.subscribe(params => {
        if (params['access_token']) {
          localStorage.setItem(itemId, params['access_token']);

          this.userService.setLoggedInUser(params['access_token'])
            .then(response => {
              console.log('Logged in', response);
              this.router.navigate(['.'], { relativeTo: this.route, queryParams: {} });
            })
            .catch(error => {
              console.error('ERROR:', error);
            });
        }
      });

    }
  }

}