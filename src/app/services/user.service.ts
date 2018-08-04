import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private accessToken: string;
  private loggedIn: boolean;
  private userProfile: UserProfile;

  constructor(
    private http: HttpClient
  ) {}

  public setLoggedInUser(accessToken: string) {
    return new Promise((resolve, reject) => {
      this.accessToken = accessToken;

      this.getSpotifyUserProfile()
        .subscribe(
          res => {
            this.loggedIn = true;
            this.userProfile = res;
            resolve(this.userProfile);
          },
          err => {
            this.logout();
            reject(err);
          }
        );
    });
  }

  private getSpotifyUserProfile(): Observable<any> {
    const url = 'https://api.spotify.com/v1/me';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.accessToken}`
      })
    };

    return this.http.get(url, httpOptions);
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public getLoginStatus() {
    return this.loggedIn;
  }

  public getUserProfile() {
    return this.userProfile;
  }

  public logout() {
    this.loggedIn = false;
    localStorage.removeItem('ng-spotify-access-token');
  }
}

export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  href: string;
  id: string;
  product: string;
  type: string;
  uri: string;
  external_urls: object;
  followers: object;
  images: Array<any>;
}
