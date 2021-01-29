import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { SigninComponent } from './signin.component';
import { AuthService } from 'src/app/_services/auth.service';
import { MaterialsModule } from 'src/app/_modules/materials/materials.module';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { User } from 'src/app/_models/user';

const userStub: User | null = {
  email: 'test1@example.com',
  token: 'asdasdgdfghdfg',
};

describe('SigninComponent', () => {
  let loader: HarnessLoader;
  let fixture: ComponentFixture<SigninComponent>;
  let component: SigninComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    [`login`]
  );
  let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', [
    `navigateByUrl`,
  ]);
  let snackbarSpy: jasmine.SpyObj<MatSnackBar> = jasmine.createSpyObj(
    'MatSnackBar',
    [`open`]
  );
  let paramMapSpy: jasmine.SpyObj<ParamMap> = jasmine.createSpyObj('ParamMap', [
    `get`,
  ]);
  const paramMapSource = new ReplaySubject<ParamMap>(1);
  paramMapSource.next(paramMapSpy);
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute> = jasmine.createSpyObj(
    'ActivatedRoute',
    {},
    { queryParamMap: paramMapSource.asObservable() }
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports: [ReactiveFormsModule, MaterialsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.signInForm.controls.email).toBeTruthy();
    expect(component.signInForm.controls.password).toBeTruthy();
  });

  it(`should set returnUrl to / if no return url in param map`, () => {
    expect(component.returnUrl).toEqual('/');
  });

  it(`should initialize and render sign in form`, async () => {
    const emailField = await loader.getHarness(
      MatInputHarness.with({ selector: `input[FormControlName='email']` })
    );
    const passwordField = await loader.getHarness(
      MatInputHarness.with({ selector: `input[FormControlName='password']` })
    );
    const signInButton = await loader.getHarness(
      MatButtonHarness.with({ text: `Sign In` })
    );
    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(signInButton).toBeTruthy();
  });

  it(`#sign in button should call login method`, async () => {
    spyOn(fixture.componentInstance, 'login');
    component.signInForm.controls.email.setValue('test@test');
    component.signInForm.controls.password.setValue('password');
    const signInButton = await loader.getHarness(
      MatButtonHarness.with({ text: `Sign In` })
    );
    await signInButton.click();
    expect(component.login).toHaveBeenCalled();
  });

  it(`should render url to register`, () => {
    const registerUrl = fixture.debugElement.queryAll(
      By.css(`a[routerLink='/register']`)
    );
    expect(registerUrl.length).toBeGreaterThan(0);
  });

  it(`sign in button should be disabled if form is invalid`, async () => {
    component.signInForm.controls.email.setValue('');
    component.signInForm.controls.password.setValue('');
    const signInButton = await loader.getHarness(
      MatButtonHarness.with({ text: `Sign In` })
    );
    expect(await signInButton.isDisabled()).toBeTrue();
  });

  it(`#signin method should call authService's login method with sign in form value`, async () => {
    authServiceSpy.login.and.returnValue(of());
    component.login();
    expect(authServiceSpy.login).toHaveBeenCalledWith(
      component.signInForm.value
    );
  });

  it(`#signin method should navigate to returnUrl when user is succesfully logged in`, async () => {
    authServiceSpy.login.and.returnValue(
      of(userStub as unknown) as Observable<void>
    );
    component.login();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(component.returnUrl);
  });

  it(`#signIn method should show snackbar when user is succesfully registered`, async () => {
    authServiceSpy.login.and.returnValue(
      of(userStub as unknown) as Observable<void>
    );
    component.login();
    expect(snackbarSpy.open).toHaveBeenCalled();
  });

  it(`#signin method should setup validation errors errors array is returned`, async () => {
    authServiceSpy.login.and.returnValue(
      throwError(['Username should be valid', `Email err1`, `Email err2`])
    );
    component.login();
    expect(component.validationErrors).toEqual(['Username should be valid', `Email err1`, `Email err2`]);
  });

  it(`#signin method should setup validation errors.error object is returned`, async () => {
    authServiceSpy.login.and.returnValue(
      throwError({error: "test"})
    );
    component.login();
    expect(component.validationErrors).toEqual(['test']);
  });

  it(`#signin method should do nothing when uncommon error is returned`, async () => {
    authServiceSpy.login.and.returnValue(
      throwError({})
    );
    component.login();
    expect().nothing();
  });

});

describe('SigninComponent', () => {
  let loader: HarnessLoader;
  let fixture: ComponentFixture<SigninComponent>;
  let component: SigninComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    [`register`]
  );
  let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', [
    `navigateByUrl`,
  ]);
  let snackbarSpy: jasmine.SpyObj<MatSnackBar> = jasmine.createSpyObj(
    'MatSnackBar',
    [`open`]
  );
  let paramMapSpy: jasmine.SpyObj<ParamMap> = jasmine.createSpyObj('ParamMap', [
    `get`,
  ]);
  const paramMapSource = new ReplaySubject<ParamMap>(1);
  paramMapSource.next(paramMapSpy);
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute> = jasmine.createSpyObj(
    'ActivatedRoute',
    {},
    { queryParamMap: paramMapSource.asObservable() }
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports: [ReactiveFormsModule, MaterialsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    paramMapSpy.get.and.returnValue(`test`);
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it(`should set returnUrl to value from param map param map`, () => {
    expect(component.returnUrl).toEqual('test');
  });
});
