import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

// declare gtag as a function to access the JS code in TS
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-GZK6SGX0XG', { page_path: event.urlAfterRedirects });
        // gtag('event', 'page_view', {
        //   page_path: event.urlAfterRedirects
        // })
      }
    });
  }
}
