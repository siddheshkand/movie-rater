import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8000/api/movies/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 21da9242117ed594ab0e1dd217d1fe226f62a813'
  })
  constructor(private httpClient: HttpClient) { }
  getMovies() {
    return this.httpClient.get(this.baseUrl, { headers: this.headers });
  }
}