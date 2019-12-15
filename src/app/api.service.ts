import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Movie, MovieToken} from './models/Movie';
import {CookieService} from 'ngx-cookie-service';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://127.0.0.1:8000/';
  baseMovieUrl = `${this.baseUrl}api/movies/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private cookieService: CookieService, private httpClient: HttpClient) {
  }

  getMovies() {
    return this.httpClient.get(this.baseMovieUrl, {headers: this.getAuthHeader()});
  }

  getMovie(id: number) {
    return this.httpClient.get(`${this.baseMovieUrl}${id}/`, {headers: this.getAuthHeader()});
  }

  createMovie(title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.httpClient.post<Movie>(`${this.baseMovieUrl}`, body, {headers: this.getAuthHeader()});
  }

  updateMovie(id: number, title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.httpClient.put<Movie>(`${this.baseMovieUrl}${id}/ `, body, {headers: this.getAuthHeader()});
  }

  deleteMovie(id: number) {
    return this.httpClient.delete<Movie>(`${this.baseMovieUrl}${id}/ `, {headers: this.getAuthHeader()});
  }

  rateMovies(rate: number, movieId: number) {
    const body = JSON.stringify({stars: rate});
    return this.httpClient.post(`${this.baseMovieUrl}${movieId}/rate_movie/`, body, {headers: this.getAuthHeader()});
  }

  loginUser(authData) {
    const body = JSON.stringify(authData);
    console.log('Debug :');
    console.log(body);
    return this.httpClient.post(`${this.baseUrl}auth/ `, body, {headers: this.headers});
  }

  getAuthHeader() {
    const token = this.cookieService.get('mr-token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }
}
