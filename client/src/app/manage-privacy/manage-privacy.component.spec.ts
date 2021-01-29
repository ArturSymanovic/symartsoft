import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialsModule } from '../_modules/materials/materials.module';
import { CookiesService } from '../_services/cookies.service';
import { ManagePrivacyComponent } from './manage-privacy.component';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('ManagePrivacyComponent', () => {
  let component: ManagePrivacyComponent;
  let fixture: ComponentFixture<ManagePrivacyComponent>;
  let loader: HarnessLoader;
  let cookieServiceSpy: jasmine.SpyObj<CookiesService> = jasmine.createSpyObj(
    'CookiesService',
    [`getCookieConsent`, `setCookieConsent`]
  );
  let snackbarSpy: jasmine.SpyObj<MatSnackBar> = jasmine.createSpyObj(
    'MatSnackBar',
    [`open`]
  );
  let bottomSheetSpy: jasmine.SpyObj<MatBottomSheet> = jasmine.createSpyObj<MatBottomSheet>(
    `MatBottomSheet`,
    [`dismiss`]
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePrivacyComponent],
      imports: [ReactiveFormsModule, MaterialsModule],
      providers: [
        { provide: CookiesService, useValue: cookieServiceSpy },
        { provide: MatBottomSheet, useValue: bottomSheetSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(ManagePrivacyComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  beforeEach(() => {});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should initialize and render slide toggles`, async () => {
    const cookieConsentSlideToggle = await loader.getHarness(
      MatSlideToggleHarness.with({ name: `cookieConsent` })
    );
    expect(component.privacySettingsForm.controls.cookieConsent).toBeTruthy();
    expect(cookieConsentSlideToggle).toBeTruthy();
  });

  it(`should render save settings button that calls saveSettings method`, async () => {
    const saveButton = await loader.getHarness(
      MatButtonHarness.with({ text: `Save` })
    );
    expect(saveButton).toBeTruthy();
    spyOn(component, `saveSettings`);
    await saveButton.click();
    expect(component.saveSettings).toHaveBeenCalled();
  });

  it('should set cookie consent slider to false when consent is not given', async () => {
    const cookieConsentSlideToggle = await loader.getHarness(
      MatSlideToggleHarness.with({ name: `cookieConsent` })
    );
    expect(await cookieConsentSlideToggle.isChecked()).toBeFalse();
  });

  it('#saveSettings should call cookie service setCookieConsent with slider value, dismiss bottom sheet and show snackbar', () => {
    component.saveSettings();
    expect(cookieServiceSpy.setCookieConsent).toHaveBeenCalledWith(
      component.privacySettingsForm.controls.cookieConsent.value
    );
    expect(bottomSheetSpy.dismiss).toHaveBeenCalled();
    expect(snackbarSpy.open).toHaveBeenCalled();
  });
});

describe('ManagePrivacyComponent', () => {
  let component: ManagePrivacyComponent;
  let fixture: ComponentFixture<ManagePrivacyComponent>;
  let loader: HarnessLoader;
  let cookieServiceSpy: jasmine.SpyObj<CookiesService> = jasmine.createSpyObj(
    'CookiesService',
    [`getCookieConsent`, `setCookieConsent`]
  );
  let snackbarSpy: jasmine.SpyObj<MatSnackBar> = jasmine.createSpyObj(
    'MatSnackBar',
    [`open`]
  );
  let bottomSheetSpy: jasmine.SpyObj<MatBottomSheet> = jasmine.createSpyObj<MatBottomSheet>(
    `MatBottomSheet`,
    [`dismiss`]
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePrivacyComponent],
      imports: [ReactiveFormsModule, MaterialsModule],
      providers: [
        { provide: CookiesService, useValue: cookieServiceSpy },
        { provide: MatBottomSheet, useValue: bottomSheetSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    cookieServiceSpy.getCookieConsent.and.returnValue(true);
    fixture = TestBed.createComponent(ManagePrivacyComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should set cookie consent slider to true when consent is given', async () => {
    const cookieConsentSlideToggle = await loader.getHarness(
      MatSlideToggleHarness.with({ name: `cookieConsent` })
    );
    expect(await cookieConsentSlideToggle.isChecked()).toBeTrue();
  });
});
