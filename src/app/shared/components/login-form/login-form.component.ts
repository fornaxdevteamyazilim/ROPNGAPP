import { CommonModule, NgIfContext } from '@angular/common';
import { Component, NgModule, TemplateRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
////import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;
formData: any;
onCreateAccountClick: any;
// onCreateAccountClick: any;

  constructor(private router: Router,private authService: AuthService) {}
  login():  void {
    this.authService.login(this.username, this.password)
      .subscribe(response => {
        if (response && response.access_token) {
          localStorage.setItem('access_token', response.access_token);
           this.router.navigate(['/home']);
        } else {
          console.log('Login Failed');
        }
      });
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    FormsModule,
    DxLoadIndicatorModule
  ],
  declarations: [ LoginFormComponent ],
  exports: [ LoginFormComponent ]
})
export class LoginFormModule { }
