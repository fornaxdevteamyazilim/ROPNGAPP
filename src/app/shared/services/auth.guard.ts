import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
const defaultPath = '/';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const login = this.authService.isAuthenticated();
    if (login) {
//      this.authService['lastAuthenticatedPath'] = route.routeConfig?.path || defaultPath;
      return true;
    }

    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);


    if (login && isAuthForm) {
      this.authService['lastAuthenticatedPath'] = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!login && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }


    return login || isAuthForm;
  }
  
  // canActivate(): boolean {

  //   const login = this.authService['loggedIn'];
  //   if (this.authService.isAuthenticated()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login-form']);
  //     return false;
  //   }
  // }
}

// @Injectable()
// export class AuthGuardService implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     const login = this.authService['loggedIn'];
//     const isAuthForm = [
//       'login-form',
//       'reset-password',
//       'create-account',
//       'change-password/:recoveryCode'
//     ];

// }
// }

// const defaultPath = '/';
// const defaultUser = {
//   username: '',
//   password: '',

// };

// @Injectable()
// export class AuthGuardService implements CanActivate {
    
//     private _user: IUser | null = defaultUser;
 
//     get loggedIn(): boolean {
//       return !!this._user;
//     }
  
//     private _lastAuthenticatedPath: string = defaultPath;
//     set lastAuthenticatedPath(value: string) {
//       this._lastAuthenticatedPath = value;
//     }
//   constructor(private router: Router, private authService: AuthService) { }

//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     const login = this.authService['loggedIn'];
//     const isAuthForm = [
//       'login-form',
//       'reset-password',
//       'create-account',
//       'change-password/:recoveryCode'
//     ].includes(route.routeConfig?.path || defaultPath);

//     // if (isLoggedIn && isAuthForm) {
//     //   this.authService.lastAuthenticatedPath = defaultPath;
//     //   this.router.navigate([defaultPath]);
//     //   return false;
//     // }

//     if (!isLoggedIn && !isAuthForm) {
//       this.router.navigate(['/login-form']);
//     }

//     // if (isLoggedIn) {
//     //   this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
//     // }

//     return login || isAuthForm;
//   }
// }
// function isLoggedIn() {
//   throw new Error('Function not implemented.');
// }
