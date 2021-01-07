import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  private cookieConsentSource = new ReplaySubject<boolean>(1);
  cookieConsent$ = this.cookieConsentSource.asObservable();

  constructor() {}

  exists(cname: string): boolean {
    if (
      document.cookie
        .split(';')
        .some((item) => item.trim().startsWith(cname + '='))
    ) {
      return true;
    }
    return false;
  }

  set(cname: string, cvalue: string, exdays: number): void {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  get(cname: string): string {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  getAll(): any {
    return decodeURIComponent(document.cookie)
      .split(';')
      .reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=').map((c) => c.trim());
        cookies[name] = value;
        return cookies;
      }, {});
  }

  delete(cname: string): void {
    document.cookie =
      cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  deleteAll(): void {
    let cookies = this.getAll();
    for (const key in cookies) {
      if (Object.prototype.hasOwnProperty.call(cookies, key)) {
        this.delete(key);
      }
    }
  }

  setCookieConsent(isAgreed: boolean): void {
    this.cookieConsentSource.next(isAgreed);
    const now = new Date();
    localStorage.setItem(
      'cookieConsent',
      JSON.stringify({
        value: isAgreed,
        expiry: now.getTime() + 1000 * 60 * 60 * 24 * 180,
      })
    );
    if (!isAgreed) {
      this.deleteAll();
    }
  }

  getCookieConsent(): boolean | null {
    const now = new Date();
    const consentObject = JSON.parse(localStorage.getItem('cookieConsent'));
    if (!consentObject) {
      this.deleteAll();
      return null;
    }
    if (now.getTime() > consentObject.expiry) {
      this.deleteAll();
      localStorage.removeItem('cookieConsent');
      return null;
    }
    return consentObject.value;
  }
}
