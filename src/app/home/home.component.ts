import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';
import { ArtistsService } from '../services/artists.service';
import { TracksService } from '../services/tracks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private loginUrl: string;
  private topArtistsShortTerm: Array<any>;
  private topArtistsMediumTerm: Array<any>;
  private topArtistsLongTerm: Array<any>;
  private topTracksShortTerm: Array<any>;
  private topTracksMediumTerm: Array<any>;
  private topTracksLongTerm: Array<any>;

  constructor(
    private userService: UserService,
    private artistsService: ArtistsService,
    private tracksService: TracksService
  ) {
    this.loginUrl = environment.loginUrl;
  }

  ngOnInit() {
    this.artistsService.topArtists$.subscribe(res => {
      this.topArtistsShortTerm = res.shortTerm;
      this.topArtistsMediumTerm = res.mediumTerm;
      this.topArtistsLongTerm = res.longTerm;
    });

    this.tracksService.topTracks$.subscribe(res => {
      this.topTracksShortTerm = res.shortTerm;
      this.topTracksMediumTerm = res.mediumTerm;
      this.topTracksLongTerm = res.longTerm;
    });
  }

}
