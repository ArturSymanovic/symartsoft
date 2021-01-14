import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/user';
import { MaterialsModule } from '../_modules/materials/materials.module';
import { AuthService } from '../_services/auth.service';
import { JwtInterceptor } from './jwt.interceptor';

const userStub: User | null = {
  email: 'test1@example.com',
  token: 'testToken',
};

describe('JwtInterceptor', () => {
  let interceptor: JwtInterceptor;
  let http: HttpClient;
  const currentUserSource = new ReplaySubject<User | null>(1);
  currentUserSource.next(null);
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    {},
    { currentUser$: currentUserSource.asObservable() }
  );
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        JwtInterceptor,
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(JwtInterceptor);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});

describe('JwtInterceptor when user is logged in', () => {
  let interceptor: JwtInterceptor;
  let http: HttpClient;
  const currentUserSource = new ReplaySubject<User | null>(1);
  currentUserSource.next(userStub);
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    {},
    { currentUser$: currentUserSource.asObservable() }
  );
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        JwtInterceptor,
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(JwtInterceptor);
    http = TestBed.inject(HttpClient);
  });

  it('should add Authorization header', () => {
    http.get<User>(`test`).subscribe({
      next: () => {},
      error: () => {},
    });
    const httpRequest = httpMock.expectOne(`test`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(interceptor).toBeTruthy();
  });
});

describe('JwtInterceptor when user is not logged in', () => {
  let interceptor: JwtInterceptor;
  let http: HttpClient;
  const currentUserSource = new ReplaySubject<User | null>(1);
  currentUserSource.next(null);
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    {},
    { currentUser$: currentUserSource.asObservable() }
  );
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        JwtInterceptor,
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(JwtInterceptor);
    http = TestBed.inject(HttpClient);
  });

  it('should not add Authorization header', () => {
    http.get<User>(`test`).subscribe({
      next: () => {},
      error: () => {},
    });
    const httpRequest = httpMock.expectOne(`test`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
    expect(interceptor).toBeTruthy();
  });
});
