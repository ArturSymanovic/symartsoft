import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/_models/user';
import { MaterialsModule } from 'src/app/_modules/materials/materials.module';
import { AuthService } from 'src/app/_services/auth.service';
import { RegisterComponent } from './register.component';

const userStub: User | null = {
  email: 'test1@example.com',
  token: 'asdasdgdfghdfg',
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let loader: HarnessLoader;
  let fixture: ComponentFixture<RegisterComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.registerForm.controls.email).toBeTruthy();
    expect(component.registerForm.controls.password).toBeTruthy();
  });

  it(`should initialize and render sign in form`, async () => {
    const emailField = await loader.getHarness(
      MatInputHarness.with({ selector: `input[FormControlName='email']` })
    );
    const passwordField = await loader.getHarness(
      MatInputHarness.with({ selector: `input[FormControlName='password']` })
    );
    const registerButton = await loader.getHarness(
      MatButtonHarness.with({ text: `Register` })
    );
    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(registerButton).toBeTruthy();
  });

  it(`register button should call register method`, async () => {
    spyOn(fixture.componentInstance, 'register');
    component.registerForm.controls.email.setValue('test@test');
    component.registerForm.controls.password.setValue('password');
    const registerButton = await loader.getHarness(
      MatButtonHarness.with({ text: `Register` })
    );
    await registerButton.click();
    expect(component.register).toHaveBeenCalled();
  });

  it(`#register method should call authService's register method with register form value`, async () => {
    authServiceSpy.register.and.returnValue(of());
    component.register();
    expect(authServiceSpy.register).toHaveBeenCalledWith(
      component.registerForm.value
    );
  });

  it(`#register method should navigate to home page when user is succesfully registered`, async () => {
    authServiceSpy.register.and.returnValue(
      of(userStub as unknown) as Observable<void>
    );
    component.register();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`/`);
  });

  it(`#register method should show snackbar when user is succesfully registered`, async () => {
    authServiceSpy.register.and.returnValue(
      of(userStub as unknown) as Observable<void>
    );
    component.register();
    expect(snackbarSpy.open).toHaveBeenCalled();
  });

  it(`#register method should setup validation errors and filter Username errors out when error array returned by service`, async () => {
    authServiceSpy.register.and.returnValue(
      throwError(['Username should be valid', `Email err1`, `Email err2`])
    );
    component.register();
    expect(component.validationErrors).toEqual([`Email err1`, `Email err2`]);
  });

  it(`#register method should do nothing when error, but not an array is returned by service`, async () => {
    authServiceSpy.register.and.returnValue(
      throwError({})
    );
    component.register();
    expect().nothing();
  });

  it(`register button should be disabled if form is invalid`, async () =>{
    component.registerForm.controls.email.setValue('');
    component.registerForm.controls.password.setValue('');
    const registerButton = await loader.getHarness(
      MatButtonHarness.with({ text: `Register` })
    );
    expect(await registerButton.isDisabled()).toBeTrue();
  });
});
