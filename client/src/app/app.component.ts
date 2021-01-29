import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
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
  showProgressSpinner: boolean = true;
  constructor(
    public router: Router,
    public authService: AuthService,
    private cookieService: CookiesService,
    private _bottomSheet: MatBottomSheet
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.showProgressSpinner = true;
      }
      if (event instanceof NavigationCancel || event instanceof NavigationError){
        this.showProgressSpinner = false;
      }
      if (event instanceof NavigationEnd) {
        this.showProgressSpinner = false;       
        if (this.cookieService.getCookieConsent() === true) {
          this.enableAnalytics(event);
        } else {
          this.cookieService.deleteAll();
        }
      }
    });
  }

  ngOnInit(): void {
    this.setCurrentUser();
    if (this.cookieService.getCookieConsent() === null) {
      this._bottomSheet.open(CookieBannerComponent, {
        hasBackdrop: false,
        panelClass: `bottom-sheet-w-100`,
        closeOnNavigation: false,
      });
    }
  }

  setCurrentUser() {
    const user: User | null = JSON.parse(
      localStorage.getItem('user') as string
    );
    this.authService.setCurrentUser(user);
  }

  enableAnalytics(event: NavigationEnd) {
    gtag('js', new Date());
    gtag('config', 'G-GZK6SGX0XG', {
      page_path: event.urlAfterRedirects,
    });
  }
}
