import { Component, OnInit } from '@angular/core';
import { ArtistsService } from '../services/artists.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html'
})
export class ArtistsComponent implements OnInit {
  private topArtistsShortTerm: Array<any>;
  private topArtistsMediumTerm: Array<any>;
  private topArtistsLongTerm: Array<any>;
  private selectedTerm: number;

  constructor(
    private artistsService: ArtistsService
  ) {
    this.selectedTerm = 0;
  }

  ngOnInit() {
    this.artistsService.topArtists$.subscribe(res => {
      this.topArtistsShortTerm = res.shortTerm;
      this.topArtistsMediumTerm = res.mediumTerm;
      this.topArtistsLongTerm = res.longTerm;
    });
  }

  private selectTerm(term: number): void {
    this.selectedTerm = term;
  }

}
