import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { api } from '../definitions/api';
import { TimeRange } from '../definitions/time-range';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  public getTopTracks(timeRange: TimeRange = 'medium_term'): Observable<any> {
    const endpoint = api.url + 'me/top/tracks';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.userService.getAccessToken()}`
      }),
      params: new HttpParams()
        .set('limit', '50')
        .set('time_range', timeRange)
    };

    return this.http.get(endpoint, httpOptions);
  }

}
