import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CookiesService } from 'src/app/_services/cookies.service';
import { CookieBannerComponent } from './cookie-banner.component';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('CookieBannerComponent', () => {
  let component: CookieBannerComponent;
  let loader: HarnessLoader;
  let fixture: ComponentFixture<CookieBannerComponent>;
  let bottomSheetSpy: jasmine.SpyObj<
    MatBottomSheetRef<CookieBannerComponent>
  > = jasmine.createSpyObj<MatBottomSheetRef<CookieBannerComponent>>(
    `MatBottomSheetRef`,
    [`dismiss`]
  );
  let cookieServiceSpy: jasmine.SpyObj<CookiesService> = jasmine.createSpyObj<CookiesService>(
    `CookiesService`,
    [`setCookieConsent`]
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatBottomSheetRef, useValue: bottomSheetSpy },
        { provide: CookiesService, useValue: cookieServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    TestBed.inject(CookiesService);
    fixture = TestBed.createComponent(CookieBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#accept should call cookie service method with true and close bottom sheet', () => {
    component.accept();
    expect(cookieServiceSpy.setCookieConsent).toHaveBeenCalledWith(true);
    expect(bottomSheetSpy.dismiss).toHaveBeenCalled();
  });

  it('should render the link to manage privacy settings', () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/manage-privacy';
      })
    ).not.toEqual(-1);
  });

  it('should render button to Accept cookies that calls accept method', async () => {
    let button = await loader.getHarness(MatButtonHarness.with({text: 'Accept All'}));
    expect(button).toBeTruthy();
    spyOn(component, `accept`);
    await button.click();
    expect(component.accept).toHaveBeenCalled(); 
  });
});
