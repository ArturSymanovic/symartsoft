import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { doesNotReject } from 'assert';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../_models/user';

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
    const userStub: User = {
      email: 'test1@example.com',
      token: 'asdasdgdfghdfg',
    };
    httpClientSpy.post.and.returnValue(of(userStub));
    authService.register(null).subscribe({
      next: () =>
        expect(httpClientSpy.post.calls.count()).toBe(
          1,
          'spy method was called once'
        ),
    });
  });

  it('#register should return user object', () => {
    const userStub: User = {
      email: 'test1@example.com',
      token: 'asdasdgdfghdfg',
    };
    httpClientSpy.post.and.returnValue(of(userStub));
    authService.register(null).subscribe({
      next: (userObject) => expect(userObject).toEqual(userStub, 'userStub'),
    });
  });

  it('#register should return an error when the server returns an error', () => {
    const errorResponse = new HttpErrorResponse({});

    httpClientSpy.post.and.returnValue(throwError(errorResponse));

    authService.register(null).subscribe({
      next: (userObject) => fail('expected an error, not userObject'),
      error: (error) => expect(error).toBeInstanceOf(HttpErrorResponse),
    });
  });

  it('#login should call the http post method once', () => {
    const userStub: User = {
      email: 'test1@example.com',
      token: 'asdasdgdfghdfg',
    };
    httpClientSpy.post.and.returnValue(of(userStub));
    authService.login(null).subscribe({
      next: () =>
        expect(httpClientSpy.post.calls.count()).toBe(
          1,
          'spy method was called once'
        ),
    });
  });

  it('#login should save user object to local storage', () => {
    const userStub: User = {
      email: 'test1@example.com',
      token: 'asdasdgdfghdfg',
    };
    httpClientSpy.post.and.returnValue(of(userStub));
    authService.login(null).subscribe({
      next: (userObject) => expect(localStorage.getItem('user')).not.toBeNull()
    });
  });

  // if the done function is not executed the test will fail with timeout error
  // this done function needed for the case where the observable was never updated 
  it('#login should update value in the current user observable', done => {
    const userStub: User = {
      email: 'test1@example.com',
      token: 'asdasdgdfghdfg',
    };
    httpClientSpy.post.and.returnValue(of(userStub));
    authService.login(null).subscribe();   
    authService.currentUser$.subscribe({
      next: (user: User) => {
        expect(user).toEqual(userStub);
        done();
      }
    });   
  });

  it('#login should return an error when the server returns an error', () => {
    const errorResponse = new HttpErrorResponse({});

    httpClientSpy.post.and.returnValue(throwError(errorResponse));

    authService.login(null).subscribe({
      next: (userObject) => fail('expected an error, not userObject'),
      error: (error) => expect(error).toBeInstanceOf(HttpErrorResponse),
    });
  });


  it('#logout should remove user object from local storage', () => {
    authService.logout();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('#logout should update value in the current user observable to null', done => {
    authService.logout();   
    authService.currentUser$.subscribe({
      next: (user: User) => {
        expect(user).toBeNull();
        done();
      }
    });   
  });

  it('#setCurrentUser should update value in the current user observable', done => {
    const userStub: User = {
      email: 'test1@example.com',
      token: 'asdasdgdfghdfg',
    };
    
    authService.setCurrentUser(userStub);
    authService.currentUser$.subscribe({
      next: (user: User) => {
        expect(user).toEqual(userStub);
        done();
      }
    });   
  });

});
