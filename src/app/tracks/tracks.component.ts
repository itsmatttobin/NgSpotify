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
    this.tracksService.topTracks$.subscribe(res => {
      this.topTracksShortTerm = res.shortTerm;
      this.topTracksMediumTerm = res.mediumTerm;
      this.topTracksLongTerm = res.longTerm;
    });
  }

}
