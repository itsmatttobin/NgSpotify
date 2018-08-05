import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { TracksService } from '../services/tracks.service';
import { environment } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  constructor(
    private userService: UserService,
    private tracksService: TracksService,
    private http: HttpClient
  ) { }

  public createPlaylistAndAddSongs(name: string) {
    this.createPlaylist(name)
      .then(res => {
        console.log('created', res);
      })
      .catch(err => {
        console.error('ERROR', err);
      });
  }

  private createPlaylist(name: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const userId = this.userService.getUserProfile().id;
      const endpoint = environment.spotifyApi.host + `users/${userId}/playlists`;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.userService.getAccessToken()}`,
          'Content-Type': 'application/json'
        })
      };

      const body = {
        name: name,
        public: false
      };

      // TODO: Add description - created from NgSpotify on {date} with your top tracks in the {term}

      this.http.post(endpoint, body, httpOptions)
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  private getTrackUrisToAddToPlaylist(/* playlist id*/): void {
    // get top tracks here and add them to created playlist
    console.log(this.tracksService.getUsersTopTracksBySelectedTerm());
  }

  // TODO: reset playlists info if selectedTerm is changed in tracks comp.
  // Subject

}
