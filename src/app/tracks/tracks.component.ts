import { Component, OnInit } from '@angular/core';
import { TracksService } from '../services/tracks.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html'
})
export class TracksComponent implements OnInit {
  private topTracksShortTerm: Array<any>;
  private topTracksMediumTerm: Array<any>;
  private topTracksLongTerm: Array<any>;
  private selectedTerm: number;

  constructor(
    private tracksService: TracksService
  ) {
    this.selectedTerm = 0;
  }

  ngOnInit() {
    this.tracksService.topTracks$.subscribe(res => {
      this.topTracksShortTerm = res.shortTerm;
      this.topTracksMediumTerm = res.mediumTerm;
      this.topTracksLongTerm = res.longTerm;
    });
  }

  private selectTerm(term: number): void {
    this.selectedTerm = term;
  }

}
