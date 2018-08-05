import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from '../services/playlists.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html'
})
export class PlaylistsComponent implements OnInit {

  constructor(
    private playlistsService: PlaylistsService
  ) { }

  ngOnInit() {
  }

  private createPlaylist(): void {
    this.playlistsService.createPlaylist('this is the name', false);
  }

}
