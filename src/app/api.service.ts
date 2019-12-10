import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Movie} from './models/Movie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8000/api/movies/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 21da9242117ed594ab0e1dd217d1fe226f62a813'
  });

  constructor(private httpClient: HttpClient) {
  }

  getMovies() {
    return this.httpClient.get(this.baseUrl, {headers: this.headers});
  }

  getMovie(id: number) {
    return this.httpClient.get(`${this.baseUrl}${id}/`, {headers: this.headers});
  }

  createMovie(title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.httpClient.post<Movie>(`${this.baseUrl}`, body, {headers: this.headers});
  }

  updateMovie(id: number, title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.httpClient.put<Movie>(`${this.baseUrl}${id}/ `, body, {headers: this.headers});
  }

  deleteMovie(id: number) {
    return this.httpClient.delete<Movie>(`${this.baseUrl}${id}/ `, {headers: this.headers});
  }

  rateMovies(rate: number, movieId: number) {
    const body = JSON.stringify({stars: rate});
    return this.httpClient.post(`${this.baseUrl}${movieId}/rate_movie/`, body, {headers: this.headers});
  }
}
