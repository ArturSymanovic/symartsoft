import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('#register should call the http post method once', () => {
    httpClientSpy.post.and.returnValue(new Observable<any>());
    authService.register(null).subscribe({
      next: () =>
        expect(httpClientSpy.post.calls.count).toBe(
          1,
          'spy method was called once'
        ),
    });
  });

  it('#register should return user object', () => {
    const userStub = {
      nameId: 'test1@example.com',
      token: 'asdasdgdfghdfg',
    };
    httpClientSpy.post.and.returnValue(of(userStub));
    authService.register(null).subscribe({
      next: (userObject) => expect(userObject).toEqual(userStub, 'userStub'),
    });
  });

  it('should return an error when the server returns an error', () => {
    const errorResponse = new HttpErrorResponse({});

    httpClientSpy.post.and.returnValue(throwError(errorResponse));

    authService.register(null).subscribe({
      next: (userObject) => fail('expected an error, not userObject'),
      error: (error) => expect(error).toBeInstanceOf(HttpErrorResponse),
    });
  });

  it('#login should call the http post method once', () => {
    httpClientSpy.post.and.returnValue(new Observable<any>());
    authService.login(null).subscribe({
      next: () =>
        expect(httpClientSpy.post.calls.count).toBe(
          1,
          'spy method was called once'
        ),
    });
  });

  it('#login should return user object', () => {
    const userStub = {
      nameId: 'test1@example.com',
      token: 'asdasdgdfghdfg',
    };
    httpClientSpy.post.and.returnValue(of(userStub));
    authService.login(null).subscribe({
      next: (userObject) => expect(userObject).toEqual(userStub, 'userStub'),
    });
  });

  it('should return an error when the server returns an error', () => {
    const errorResponse = new HttpErrorResponse({});

    httpClientSpy.post.and.returnValue(throwError(errorResponse));

    authService.login(null).subscribe({
      next: (userObject) => fail('expected an error, not userObject'),
      error: (error) => expect(error).toBeInstanceOf(HttpErrorResponse),
    });
  });

});
