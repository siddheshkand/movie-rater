import {Component, OnInit,} from '@angular/core';
import {ApiService} from '../api.service';
import {Movie} from '../models/Movie';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  movies: any = [];
  selectedMovie = null;
  editedMovie = null;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getMovies().subscribe(
      data => {
        this.movies = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.editedMovie = null;
  }

  editMovie(movie: Movie) {
    this.editedMovie = movie;
    this.selectedMovie = null;
  }

  createMovie() {
    this.editedMovie = {title: '', description: ''};
    this.selectedMovie = null;
  }

  deletedMovie(movie: Movie) {
    console.log('delete', movie.title);
    this.apiService.deleteMovie(movie.id).subscribe(
      data => {
        console.log(data);
        this.movies = this.movies.filter(mov => mov.id !== movie.id);
      },
      error => {
        console.log(error);
      }
    );
    this.selectedMovie = null;
  }

  movieCreated(movie: Movie) {
    this.movies.push(movie);
    this.editedMovie = null;
  }

  movieUpdated(movie: Movie) {
    const index = this.movies.findIndex(mov => mov.id === movie.id);
    if (index >= 0) {
      this.movies[index] = movie;
    }
    this.editedMovie = null;
  }
}
