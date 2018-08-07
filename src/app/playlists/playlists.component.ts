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
  private playlistName: string;
  private playlistNameInput: HTMLElement;
  private status: string;

  constructor(
    private playlistsService: PlaylistsService,
  ) {
    this.chevron = faChevronRight;
    this.playlistCardActive = true;
    this.creating = false;
    this.playlistName = '';
    this.status = null;
  }

  ngOnInit() {
    this.playlistNameInput = document.getElementById('playlist-name');
  }

  private createPlaylist(): void {
    if (!this.creating) {
      this.creating = true;

      setTimeout(() => {
        this.playlistNameInput.focus();
      });
    } else {
      this.playlistsService.createPlaylistAndAddTracks(this.playlistName)
        .then(res => {
          this.status = 'success';
          this.resetCreating();

          (<any>window).gtag('event', 'Created', {
            'event_category': 'Playlist'
          });

          setTimeout(() => {
            this.status = null;
          }, 3000);
        })
        .catch(err => {
          this.status = 'error';
          console.error('ERROR', err);

          setTimeout(() => {
            this.status = null;
          }, 3000);
        });
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
    this.playlistName = '';
  }

}
