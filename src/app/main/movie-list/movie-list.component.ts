import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @Input() movies = []
  @Output() selectedMovie = new EventEmitter();
  constructor() { }

  ngOnInit() { }
  movieClicked(movie) {
    this.selectedMovie.emit(movie);

  }
}
