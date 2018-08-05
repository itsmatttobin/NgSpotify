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

  constructor(
    private playlistsService: PlaylistsService,
  ) {
    this.chevron = faChevronRight;
    this.playlistCardActive = true;
    this.creating = false;
    this.playlistName = '';
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
      this.playlistsService.createPlaylistAndAddSongs(this.playlistName);

      // this.playlistsService.createPlaylist(this.playlistName).subscribe(res => {
      //   console.log(res);
      //   this.resetCreating();
      // });
      // this.playlistsService.createPlaylist(this.playlistName).then(res => {
      //   console.log(res);
      // }).catch(err => {
      //   console.error('ERROR', err);
      // });
    }
  }

  // TODO: reset playlists info if selectedTerm is changed in tracks comp.
  // Subject

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
