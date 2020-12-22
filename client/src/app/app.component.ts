import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';

// declare gtag as a function to access the JS code in TS
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public router: Router, public authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-GZK6SGX0XG', { page_path: event.urlAfterRedirects });
        // gtag('event', 'page_view', {
        //   page_path: event.urlAfterRedirects
        // })
      }
    });
  }
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User =  JSON.parse(localStorage.getItem('user'));
    this.authService.setCurrentUser(user);
  }
}
