import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from '../services/playlists.service';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html'
})
export class PlaylistsComponent implements OnInit {
  private chevron: any;
  private playlistCardActive: boolean;
  private creating: boolean;

  constructor(
    private playlistsService: PlaylistsService
  ) {
    this.chevron = faChevronRight;
    this.playlistCardActive = true;
    this.creating = false;
  }

  ngOnInit() {
  }

  private createPlaylist(): void {
    if (!this.creating) {
      this.creating = true;
    } else {
      this.playlistsService.createPlaylist('this is the name', false);
    }
  }

  private togglePlaylistCard(): void {
    this.playlistCardActive = !this.playlistCardActive;

    if (this.playlistCardActive) {
      this.chevron = faChevronRight;
    } else {
      this.chevron = faChevronLeft;
    }
  }

  private resetCreating(): void {
    this.creating = false;
  }

}
