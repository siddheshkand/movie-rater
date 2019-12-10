import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../api.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

interface TokenObj {
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(private router: Router, private apiService: ApiService, private cookieService: CookieService) {
  }

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    console.log(mrToken);
    if (mrToken) {
      this.router.navigate(['/movies']);
    }
  }

  saveForm() {
    console.log();
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObj) => {
        console.log(result);
        this.cookieService.set('mr-token', result.token);
        this.router.navigate(['/movies']);
      },
      error => ((console.log(error)))
    );
  }
}
