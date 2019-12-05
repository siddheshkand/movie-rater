import { Component, OnInit, } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  movies: any = []
  selectedMovie = null;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getMovies().subscribe(
      data => {
        this.movies = data;
      },
      error => {

      }
    );
  }
  selectMovie(movie) {
    this.selectedMovie = movie;
  }

}
