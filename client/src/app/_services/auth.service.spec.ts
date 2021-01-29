import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { User } from '../_models/user';
import { AuthService } from './auth.service';

const userStub: User | null = {
  email: 'test1@example.com',
  token: 'asdasdgdfghdfg',
};

describe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'delete']);
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
    httpClientSpy.post.and.returnValue(of(userStub));
    authService.register(null).subscribe({
      next: () =>
        expect(httpClientSpy.post.calls.count()).toBe(
          1,
          'spy method was called once'
        ),
    });
  });

  it('#register should save user object to local storage', () => {
    httpClientSpy.post.and.returnValue(of(userStub));
    authService.register(null).subscribe({
      next: () => expect(localStorage.getItem('user')).not.toBeNull(),
    });
  });

  // if the done function is not executed the test will fail with timeout error
  // this done function needed for the case where the observable was never updated
  it('#register should update value in the current user observable', (done) => {
    httpClientSpy.post.and.returnValue(of(userStub));
    authService.register(null).subscribe();
    authService.currentUser$.subscribe({
      next: (user: User | null) => {
        expect(user).toEqual(userStub);
        done();
      },
    });
  });

  it('#register should return an error when the server returns an error', () => {
    const errorResponse = new HttpErrorResponse({});
    httpClientSpy.post.and.returnValue(throwError(errorResponse));
    authService.register(null).subscribe({
      next: () => fail('expected an error, not userObject'),
      error: (error) => expect(error).toBeInstanceOf(HttpErrorResponse),
    });
  });

  it('#login should call the http post method once', () => {
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
    httpClientSpy.post.and.returnValue(of(userStub));
    authService.login(null).subscribe({
      next: () => expect(localStorage.getItem('user')).not.toBeNull(),
    });
  });

  it('#login should update value in the current user observable', (done) => {
    httpClientSpy.post.and.returnValue(of(userStub));
    authService.login(null).subscribe();
    authService.currentUser$.subscribe({
      next: (user: User | null) => {
        expect(user).toEqual(userStub);
        done();
      },
    });
  });

  it('#login should return an error when the server returns an error', () => {
    const errorResponse = new HttpErrorResponse({});
    httpClientSpy.post.and.returnValue(throwError(errorResponse));
    authService.login(null).subscribe({
      next: () => fail('expected an error, not userObject'),
      error: (error) => expect(error).toBeInstanceOf(HttpErrorResponse),
    });
  });

  it('#logout should remove user object from local storage', () => {
    authService.logout();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('#logout should update value in the current user observable to null', (done) => {
    authService.logout();
    authService.currentUser$.subscribe({
      next: (user: User | null) => {
        expect(user).toBeNull();
        done();
      },
    });
  });

  it('#setCurrentUser should update value in the current user observable', (done) => {
    authService.setCurrentUser(userStub);
    authService.currentUser$.subscribe({
      next: (user: User | null) => {
        expect(user).toEqual(userStub);
        done();
      },
    });
  });

  it('#delete should call the http delete method once', () => {
    httpClientSpy.delete.and.returnValue(of(userStub));
    authService.delete().subscribe({
      next: () =>
        expect(httpClientSpy.delete.calls.count()).toBe(
          1,
          'spy method was called once'
        ),
    });
  });

  it('#delete should remove user object from local storage', () => {
    localStorage.setItem('user', "asd");
    httpClientSpy.delete.and.returnValue(of(null));
    authService.delete().subscribe({
      next: () => expect(localStorage.getItem('user')).toBeNull(),
    });
  });

  it('#delete should update value in the current user observable to null', (done) => {  
    httpClientSpy.delete.and.returnValue(of(null));
    authService.delete().subscribe();
    authService.currentUser$.subscribe({
      next: (user: User | null) => {
        expect(user).toBeNull();
        done();
      },
    });
  });
});
