import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { CookiesService } from '../_services/cookies.service';

@Component({
  selector: 'app-manage-privacy',
  templateUrl: './manage-privacy.component.html',
  styleUrls: ['./manage-privacy.component.css'],
})
export class ManagePrivacyComponent implements OnInit {
  privacySettingsForm: FormGroup = new FormGroup({});
  constructor(
    private cookieService: CookiesService,
    private _bottomSheet: MatBottomSheet,
    private snackbar: MatSnackBar,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.titleService.setTitle(`Privacy Settings | Symartsoft`);

  }

  initializeForm(): void {
    const currentCookieConsent = this.cookieService.getCookieConsent();
    let initialSliderValue = false;
    if (currentCookieConsent === true) {
      initialSliderValue = true;
    }
    this.privacySettingsForm = new FormGroup({
      cookieConsent: new FormControl(initialSliderValue),
    });
  }

  saveSettings() {
    this.cookieService.setCookieConsent(
      this.privacySettingsForm.controls.cookieConsent.value
    );
    this._bottomSheet.dismiss();
    this.snackbar.open('Settings Saved', '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
