import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';
import { CookiesService } from './_services/cookies.service';
import { CookieBannerComponent } from './_sharedcomponents/cookie-banner/cookie-banner.component';

// declare gtag as a function to access the JS code in TS
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    public router: Router,
    public authService: AuthService,
    private cookieService: CookiesService,
    private _bottomSheet: MatBottomSheet
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.cookieService.getCookieConsent()) {
          gtag('js', new Date());
          gtag('config', 'G-GZK6SGX0XG', {
            page_path: event.urlAfterRedirects,
          });
        } else {
          this.cookieService.deleteAll();
        }
      }
    });
  }
  ngOnInit(): void {
    this.setCurrentUser();
    if (!this.cookieService.getCookieConsent())
    {
      this._bottomSheet.open(CookieBannerComponent, {
        hasBackdrop: false,
        panelClass: `bottom-sheet-w-100`
      });
    }
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.authService.setCurrentUser(user);
  }
}
