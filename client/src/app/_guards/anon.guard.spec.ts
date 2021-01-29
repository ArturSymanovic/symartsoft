import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { AnonGuard } from './anon.guard';

const userStub: User | null = {
  email: 'test1@example.com',
  token: 'testPassword',
};

describe('AnonGuard', () => {
  let guard: AnonGuard;
  const currentUserSource = new ReplaySubject<User | null>(1);
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    {},
    { currentUser$: currentUserSource.asObservable() }
  );
  let snackbarSpy: jasmine.SpyObj<MatSnackBar> = jasmine.createSpyObj(
    'MatSnackBar',
    ['open']
  );
  let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', [
    'navigate',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    TestBed.inject(Router);
    TestBed.inject(MatSnackBar);
    TestBed.inject(AuthService);
    guard = TestBed.inject(AnonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

describe('AnonGuard when user is logged in:', () => {
  let guard: AnonGuard;
  const currentUserSource = new ReplaySubject<User | null>(1);
  currentUserSource.next(userStub);
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    {},
    { currentUser$: currentUserSource.asObservable() }
  );
  let snackbarSpy: jasmine.SpyObj<MatSnackBar> = jasmine.createSpyObj(
    'MatSnackBar',
    ['open']
  );
  let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', [
    'navigate',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    TestBed.inject(Router);
    TestBed.inject(MatSnackBar);
    TestBed.inject(AuthService);
    guard = TestBed.inject(AnonGuard);
  });

  it(`#canActivate should return false`, (done) => {
    guard.canActivate().subscribe({
      next: (value) => {
        expect(value).toBe(false);
        done();
      },
    });
  });
});

describe('AnonGuard when user is logged out:', () => {
  let guard: AnonGuard;
  const currentUserSource = new ReplaySubject<User | null>(1);
  currentUserSource.next(null);
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    {},
    { currentUser$: currentUserSource.asObservable() }
  );
  let snackbarSpy: jasmine.SpyObj<MatSnackBar> = jasmine.createSpyObj(
    'MatSnackBar',
    ['open']
  );
  let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', [
    'navigate',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    TestBed.inject(Router);
    TestBed.inject(MatSnackBar);
    TestBed.inject(AuthService);
    guard = TestBed.inject(AnonGuard);
  });

  it(`#canActivate should return false`, (done) => {
    guard.canActivate().subscribe({
      next: (value) => {
        expect(value).toBe(true);
        done();
      },
    });
  });
});
