import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TracksService } from '../services/tracks.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html'
})
export class TracksComponent implements OnInit {
  private topTracksShortTerm: Array<any>;
  private topTracksMediumTerm: Array<any>;
  private topTracksLongTerm: Array<any>;

  constructor(
    private userService: UserService,
    private tracksService: TracksService
  ) { }

  ngOnInit() {
    this.getTopTracksShortTerm();
    this.getTopTracksMediumTerm();
    this.getTopTracksLongTerm();
  }

  private getTopTracksShortTerm(): void {
    this.tracksService.getTopTracks('short_term')
      .subscribe(
        res => {
          this.topTracksShortTerm = res.items;
        },
        err => {
          console.error('ERROR', err);
        }
      );
  }

  private getTopTracksMediumTerm(): void {
    this.tracksService.getTopTracks('medium_term')
      .subscribe(
        res => {
          this.topTracksMediumTerm = res.items;
        },
        err => {
          console.error('ERROR', err);
        }
      );
  }

  private getTopTracksLongTerm(): void {
    this.tracksService.getTopTracks('long_term')
      .subscribe(
        res => {
          this.topTracksLongTerm = res.items;
        },
        err => {
          console.error('ERROR', err);
        }
      );
  }

}
