import { Component } from '@angular/core';
import { UserToken } from './core/models/dtos/user-token';
import { AuthService } from './core/services/system/auth.service';

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'BFCTicketSPA';
  constructor(private authService: AuthService){

  }
  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: UserToken = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.setCurrentUser(user);
      if(this.authService.isLoggedIn())
      {
        //this.notificationService.createHubConnection(user);
      }

    }

  }
}
