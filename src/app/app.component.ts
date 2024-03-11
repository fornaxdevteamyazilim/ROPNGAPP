import { Component, HostBinding } from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { Router } from '@angular/router';
const defaultPath = '/';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService,private router: Router) { }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }


  // ngOnInit(): void {
  //   // Token alındığında yapılabilecek işlemler
  // }

  // isAuthenticated(): boolean {
  //   return this.authService.isAuthenticated();
  // }



  //   ngOnInit(): void {
  //   this.router.navigate(['/login-form']);
    
  // }

  // isAuthenticated(): boolean {
  //   return !!localStorage.getItem('access_token');
  // }
}