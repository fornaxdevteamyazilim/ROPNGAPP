import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IUser {
  username: string;
  
}
@Injectable()
export class AuthService {
  [x: string]: any;
  private apiUrl  = 'http://sr.yazilimocagi.net:9063'; // Gerçek API URL'nizi ekleyin
  private clientId = 'ropNGui';
  private clientSecret = 'Ab1234';

  constructor(private router: Router,private http: HttpClient) {}



  login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', this.clientId)
    //  .set('client_secret', this.clientSecret)
      .set('username', username)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.apiUrl}/token`, body.toString(), { headers });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login-form']);
  }
  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this['_user']
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

}


