import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../definitions/user-profile';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private accessToken: string;
  private loggedIn: boolean;
  private userProfile: UserProfile;

  constructor(
    private http: HttpClient
  ) { }

  public setLoggedInUser(accessToken: string): Promise<UserProfile> {
    return new Promise<UserProfile>((resolve, reject) => {
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
    const endpoint = environment.spotifyApi.host + 'me';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.accessToken}`
      })
    };

    return this.http.get(endpoint, httpOptions);
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public getLoginStatus(): boolean {
    return this.loggedIn;
  }

  public getUserProfile(): UserProfile {
    return this.userProfile;
  }

  public logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('ng-spotify-access-token');
  }

}
