import { TestBed } from '@angular/core/testing';
import { CookiesService } from './cookies.service';

const year1970 = new Date(1970, 1, 1).toUTCString();
const year2050 = new Date(2050, 1, 1).toUTCString();

// Be aware of possibility for cookies to persist between different tests
describe('CookiesService', () => {
  let service: CookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#exists should return true if cookie exists`, () => {
    document.cookie = `cookie1=cookie1Value;expires=${year2050};path=/`;
    expect(service.exists(`cookie1`)).toBe(true);
  });

  it(`#exists should return false if cookie does not exist`, () => {
    document.cookie = `cookie1=cookie1Value;expires=${year1970};path=/`;
    expect(service.exists(`cookie1`)).toBe(false);
  });

  it(`#set should set new cookie with given parameters`, () => {
    document.cookie = `cookie1=cookie1Value;expires=${year1970};path=/`;
    service.set('cookie1', 'cookieValue', 50);
    expect(document.cookie.includes(`cookie1`)).toBe(true);
  });

  it(`#get should return existing cookie value`, () => {
    const val = `cookie1Value`;
    document.cookie = `cookie1=${val};expires=${year2050};path=/`;
    expect(service.get('cookie1')).toBe(val);
  });

  it(`#get should return empty string if value does not exist`, () => {
    const val = `cookie1Value`;
    document.cookie = `cookie1=${val};expires=${year1970};path=/`;
    expect(service.get('cookie1')).toBe(``);
  });

  it(`#getAll should return dictionary of existing cookies`, () => {
    document.cookie = `cookie1=cookie1Value;expires=${year2050};path=/`;
    document.cookie = `cookie2=cookie2Value;expires=${year2050};path=/`;
    const expectedResult = {
      cookie1: `cookie1Value`,
      cookie2: `cookie2Value`,
    };
    expect(service.getAll()).toEqual(expectedResult);
  });

  it(`#delete should delete cookie`, () => {
    document.cookie = `cookie1=cookie1Value;expires=${year2050};path=/`;
    service.delete(`cookie1`);
    expect(document.cookie.includes(`cookie1`)).toBe(false);
  });

  it(`#deleteAll should delete allCookies`, () => {
    document.cookie = `cookie1=cookie1Value;expires=${year2050};path=/`;
    document.cookie = `cookie2=cookie2Value;expires=${year2050};path=/`;
    document.cookie = `cookie3=cookie3Value;expires=${year2050};path=/`;
    service.deleteAll();
    expect(document.cookie.includes(`cookie1`)).toBe(false);
    expect(document.cookie.includes(`cookie2`)).toBe(false);
    expect(document.cookie.includes(`cookie3`)).toBe(false);
  });
});

describe('CookiesService', () => {
  let service: CookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiesService);
  });

  it(`#setCookieConsent(true) should set service observable to true and set local storage entry`, (done) => {
    localStorage.removeItem('cookieConsent');
    service.setCookieConsent(true);
    service.cookieConsent$.subscribe({
      next: (value) => {
        expect(value).toBe(true);
        expect(localStorage.getItem('cookieConsent')?.includes(`true`)).toBe(
          true
        );
        done();
      },
    });
  });
});

describe('CookiesService', () => {
  let service: CookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiesService);
  });

  it(`#setCookieConsent(false) should set service observable to false, set local storage entry and delete all cookies`, (done) => {
    spyOn(service, `deleteAll`);
    service.setCookieConsent(false);
    service.cookieConsent$.subscribe({
      next: (value) => {
        expect(value).toBe(false);
        expect(localStorage.getItem('cookieConsent')?.includes(`false`)).toBe(
          true
        );
        expect(service.deleteAll).toHaveBeenCalled();
        done();
      },
    });
  });
});

describe('CookiesService', () => {
  let service: CookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiesService);
  });

  it(`#getCookieConsent should return true if cookieConsent was given and not expired`, () => {
    service.setCookieConsent(true);
    expect(service.getCookieConsent()).toBe(true);
  });
});

describe('CookiesService', () => {
  let service: CookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiesService);
  });

  it(`#getCookieConsent should delete local storage entry and return null if cookieConsent was given but expired`, () => {
    localStorage.setItem(
      'cookieConsent',
      JSON.stringify({
        value: true,
        expiry: new Date(1970, 1, 1).getTime(),
      })
    );
    expect(service.getCookieConsent()).toBe(null);
    expect(localStorage.getItem('cookieConsent')).toBe(null);
  });
});

describe('CookiesService', () => {
  let service: CookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiesService);
  });

  it(`#getCookieConsent should return false if cookieConsent was refuced and not expired`, () => {
    service.setCookieConsent(false);
    expect(service.getCookieConsent()).toBe(false);
  });
});

describe('CookiesService', () => {
  let service: CookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiesService);
  });

  it(`#getCookieConsent should return null if cookieConsent object does not exist in local storage`, () => {
    localStorage.removeItem(`cookieConsent`);
    expect(service.getCookieConsent()).toBe(null);
  });
});
