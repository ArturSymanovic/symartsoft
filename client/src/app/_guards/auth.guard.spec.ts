import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { AuthGuard } from './auth.guard';

const userStub: User | null = {
  email: 'test1@example.com',
  token: 'testPassword',
};

describe('AuthGuard', () => {
  let guard: AuthGuard;
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
        { provide: ActivatedRouteSnapshot, useValue: {} },
        { provide: RouterStateSnapshot, useValue: {} },
      ],
    });
    TestBed.inject(Router);
    TestBed.inject(MatSnackBar);
    TestBed.inject(AuthService);
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

describe('AuthGuard when user is logged in:', () => {
  let guard: AuthGuard;
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
  let activatedRouteSnapshotSpy: jasmine.SpyObj<ActivatedRouteSnapshot> = jasmine.createSpyObj(
    'ActivatedRouteSnapshot',
    ['test']
  );
  let RouterStateSnapshotSpy: jasmine.SpyObj<RouterStateSnapshot> = jasmine.createSpyObj(
    'RouterStateSnapshot',
    [],
    { url: '/' }
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRouteSnapshot, useValue: {} },
        { provide: RouterStateSnapshot, useValue: {} },
      ],
    });
    TestBed.inject(Router);
    TestBed.inject(MatSnackBar);
    TestBed.inject(AuthService);
    guard = TestBed.inject(AuthGuard);
  });

  it(`#canActivate should return true`, (done) => {
    guard
      .canActivate(activatedRouteSnapshotSpy, RouterStateSnapshotSpy)
      .subscribe({
        next: (value) => {
          expect(value).toBe(true);
          done();
        },
      });
  });
});

describe('AuthGuard when user is logged out:', () => {
  let guard: AuthGuard;
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
  let activatedRouteSnapshotSpy: jasmine.SpyObj<ActivatedRouteSnapshot> = jasmine.createSpyObj(
    'ActivatedRouteSnapshot',
    ['test']
  );
  let RouterStateSnapshotSpy: jasmine.SpyObj<RouterStateSnapshot> = jasmine.createSpyObj(
    'RouterStateSnapshot',
    [],
    { url: '/' }
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRouteSnapshot, useValue: {} },
        { provide: RouterStateSnapshot, useValue: {} },
      ],
    });
    TestBed.inject(Router);
    TestBed.inject(MatSnackBar);
    TestBed.inject(AuthService);
    guard = TestBed.inject(AuthGuard);
  });

  it(`#canActivate should return false`, (done) => {
    guard
      .canActivate(activatedRouteSnapshotSpy, RouterStateSnapshotSpy)
      .subscribe({
        next: (value) => {
          expect(value).toBe(false);
          done();
        },
      });
  });
});
