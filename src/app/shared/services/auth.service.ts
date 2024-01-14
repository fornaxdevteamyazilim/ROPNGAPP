import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IUser {
  username: string;
  
}
const defaultPath = '/';
// const defaultUser = {
//  username:'',
//  password:''
// };

@Injectable()
export class AuthService {
  [x: string]: any;
  private authUrl  = 'http://sr.yazilimocagi.net:9063/token'; // Gerçek API URL'nizi ekleyin
  private clientId = 'ropNGui';
  private clientSecret = 'Ab1234';
  authService: any;
  logIn: any;


  constructor(private router: Router,private http: HttpClient) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    // HTTP isteği için Authorization header'ını ekleyin (Basic Authentication).
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
    });

    return this.http.post(`${this.authUrl }/token`, null, { headers });
  }
 

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(username: string, password: string): Observable<any> {
    const body = new URLSearchParams({
      'grant_type': 'password',
      'username': username,
      'password': password,
      'client_id': this.clientId,
     // 'client_secret': this.clientSecret
    });

    return this.http.post(this.authUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
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



  async logOut() {
    this['_user'] = null;
    this.router.navigate(['/login-form']);
  }
}
// @Injectable()
// export class AuthGuardService implements CanActivate {
//   constructor(private router: Router, private authService: AuthService) { }

//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     const login = this.authService['loggedIn'];
//     const isAuthForm = [
//       'login-form',
//       'reset-password',
//       'create-account',
//       'change-password/:recoveryCode'
//     ].includes(route.routeConfig?.path || defaultPath);

//     if (login && isAuthForm) {
//       this.authService['lastAuthenticatedPath'] = defaultPath;
//       this.router.navigate([defaultPath]);
//       return false;
//     }

//     if (!login && !isAuthForm) {
//       this.router.navigate(['/login-form']);
//     }

//     if (login) {
//       this.authService['lastAuthenticatedPath'] = route.routeConfig?.path || defaultPath;
//     }

//     return login || isAuthForm;
//   }
// }


