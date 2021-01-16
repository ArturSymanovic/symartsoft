import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AuthService } from './_services/auth.service';
import { CookiesService } from './_services/cookies.service';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { User } from './_models/user';

const userStub: User | null = {
  email: 'test1@example.com',
  token: 'testToken',
};

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let cookieServiceSpy: jasmine.SpyObj<CookiesService> = jasmine.createSpyObj(
    'CookiesService',
    [`getCookieConsent`, `setCookieConsent`, `deleteAll`]
  );
  let eventSource = new ReplaySubject<RouterEvent>(1);
  let routerMock = {
    navigateByUrl: jasmine.createSpy(`navigateByUrl`),
    events: eventSource.asObservable(),
    url: `test/url`,
  };
  const currentUserSource = new ReplaySubject<User | null>(1);
  currentUserSource.next(null);
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    [`setCurrentUser`],
    { currentUser$: currentUserSource.asObservable() }
  );
  let bottomSheetSpy: jasmine.SpyObj<MatBottomSheet> = jasmine.createSpyObj<MatBottomSheet>(
    `MatBottomSheet`,
    [`dismiss`, `open`]
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: CookiesService, useValue: cookieServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatBottomSheet, useValue: bottomSheetSpy },
      ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    cookieServiceSpy.getCookieConsent.and.returnValue(null);
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create navbar', () => {
    const navbar = fixture.nativeElement.querySelector('app-nav');
    expect(navbar).toBeTruthy();
  });

  it('should create router outlet', () => {
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it(`#setCurrentUser should call auth services setCurrentUser method`, () => {
    fixture.componentInstance.setCurrentUser();
    expect(component.authService.setCurrentUser).toHaveBeenCalled();
  });

  it(`should call setCurrentUser`, () =>{
    spyOn(component, `setCurrentUser`);
    component.ngOnInit();
    expect(component.setCurrentUser).toHaveBeenCalled();
  });
});

describe('AppComponent when cookie consent is null', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let cookieServiceSpy: jasmine.SpyObj<CookiesService> = jasmine.createSpyObj(
    'CookiesService',
    [`getCookieConsent`, `setCookieConsent`, `deleteAll`]
  );
  let eventSource = new ReplaySubject<RouterEvent>(1);
  let routerMock = {
    navigateByUrl: jasmine.createSpy(`navigateByUrl`),
    events: eventSource.asObservable(),
    url: `test/url`,
  };
  const currentUserSource = new ReplaySubject<User | null>(1);
  currentUserSource.next(null);
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    [`setCurrentUser`],
    { currentUser$: currentUserSource.asObservable() }
  );
  let bottomSheetSpy: jasmine.SpyObj<MatBottomSheet> = jasmine.createSpyObj<MatBottomSheet>(
    `MatBottomSheet`,
    [`dismiss`, `open`]
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: CookiesService, useValue: cookieServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatBottomSheet, useValue: bottomSheetSpy },
      ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component =fixture.componentInstance;
    cookieServiceSpy.getCookieConsent.and.returnValue(null);
    eventSource.next(new NavigationEnd(1,`test`, `test`));
    fixture.detectChanges();
  });

  it(`should open bottom sheet`, async () => {
    component.ngOnInit();
    expect(cookieServiceSpy.getCookieConsent).toHaveBeenCalled();
    expect(bottomSheetSpy.open).toHaveBeenCalled();
  });

  it(`should delete all cookies on navigation end event`, async () => {
    expect(cookieServiceSpy.deleteAll).toHaveBeenCalled();
  });

});

describe('AppComponent when cookie consent is true', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let cookieServiceSpy: jasmine.SpyObj<CookiesService> = jasmine.createSpyObj(
    'CookiesService',
    [`getCookieConsent`, `setCookieConsent`, `deleteAll`]
  );
  let eventSource = new ReplaySubject<RouterEvent>(1);
  let routerMock = {
    navigateByUrl: jasmine.createSpy(`navigateByUrl`),
    events: eventSource.asObservable(),
    url: `test/url`,
  };
  const currentUserSource = new ReplaySubject<User | null>(1);
  currentUserSource.next(null);
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    [`setCurrentUser`],
    { currentUser$: currentUserSource.asObservable() }
  );
  let bottomSheetSpy: jasmine.SpyObj<MatBottomSheet> = jasmine.createSpyObj<MatBottomSheet>(
    `MatBottomSheet`,
    [`dismiss`, `open`]
  );
  (<any>window).gtag=function() {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: CookiesService, useValue: cookieServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatBottomSheet, useValue: bottomSheetSpy },
      ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component =fixture.componentInstance;
    cookieServiceSpy.getCookieConsent.and.returnValue(true);
    eventSource.next(new NavigationEnd(1,`test`, `test`));
    fixture.detectChanges();
  });

  it(`should enable analytics on each navigation end event`, (done) => {
    spyOn(component, 'enableAnalytics');
    eventSource.next(new NavigationEnd(1,`test`, `test`));
    component.router.events.subscribe({
      next: (event) => {
        expect(component.enableAnalytics).toHaveBeenCalled();
        done();
      }
    })
  });

});