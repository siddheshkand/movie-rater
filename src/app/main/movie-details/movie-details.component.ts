import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ApiService} from '../../api.service';
import {Movie} from '../../models/Movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie: Movie;
  @Output() updateMovie = new EventEmitter();
  rateHovered = 0;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
  }

  rateHover(rate) {
    this.rateHovered = rate;
  }

  rateClicked(rate) {
    this.apiService.rateMovies(rate, this.movie.id).subscribe(
      result => this.getDetails(),
      error => {
        console.log(error);
      });
  }

  getDetails() {
    this.apiService.getMovie(this.movie.id).subscribe(movie => {
        this.updateMovie.emit(movie);
      },
      error => {
        console.log(error);
      });
  }
}
