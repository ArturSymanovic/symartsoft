import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CookiesService } from 'src/app/_services/cookies.service';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css'],
})
export class CookieBannerComponent implements OnInit {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CookieBannerComponent>,
    private cookieService: CookiesService
  ) {}

  ngOnInit(): void {}

  accept(): void {
    this.cookieService.setCookieConsent(true);
    this._bottomSheetRef.dismiss();
  }

  manage(): void {
    this.cookieService.setCookieConsent(false);
    this.cookieService.deleteAll();
    this._bottomSheetRef.dismiss();
  }
}
