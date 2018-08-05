import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { TracksService } from '../services/tracks.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  constructor(
    private userService: UserService,
    private tracksService: TracksService,
    private http: HttpClient
  ) { }

  public createPlaylistAndAddTracks(name: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.createPlaylist(name)
        .then(res => {
          return this.addTracksToPlaylist(res.id);
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  private createPlaylist(name: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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

      // TODO: Add description - "Playlist created with {appName}"

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

  private addTracksToPlaylist(playlistId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const trackUris = this.getTrackUrisToAddToPlaylist();

      const userId = this.userService.getUserProfile().id;
      const endpoint = environment.spotifyApi.host + `users/${userId}/playlists/${playlistId}/tracks`;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.userService.getAccessToken()}`,
          'Content-Type': 'application/json'
        })
      };

      const body = {
        uris: trackUris
      };

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

  private getTrackUrisToAddToPlaylist(): Array<string> {
    const tracks = this.tracksService.getUsersTopTracksBySelectedTerm().map(track => {
      return track.uri;
    });

    return tracks;
  }

}
