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

  public createPlaylist(name: string, isPublic: boolean): void {
    console.log(name);
    console.log(isPublic);
    console.log(this.userService.getUserProfile().id);
  }

  private addSongsToPlaylist(/* playlist id*/): void {
    // get top tracks here and add them to created playlist
  }

  // TODO: reset playlists info if selectedTerm is changed in tracks comp.
  // Subject

}
