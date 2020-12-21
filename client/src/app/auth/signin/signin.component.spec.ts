import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './signin.component';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialsModule } from 'src/app/_modules/materials/materials.module';
import { By } from '@angular/platform-browser';

describe('SigninComponent', () => {
  let loader: HarnessLoader;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialsModule,
        RouterTestingModule.withRoutes([
        ])
      ],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
    fixture = TestBed.createComponent(SigninComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should initialize and render sign in form`, async () => {
    const emailField = await loader.getHarness(MatInputHarness.with({selector: `input[FormControlName='email']`}));
    const passwordField = await loader.getHarness(MatInputHarness.with({selector: `input[FormControlName='password']`}));
    const signInButton = await loader.getHarness(MatButtonHarness.with({text: `Sign In`}));
    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(signInButton).toBeTruthy();
  });

  it(`#sign in button should call login method`, async () => {
    spyOn(fixture.componentInstance, 'login');
    fixture.componentInstance.signInForm.controls.email.setValue("test@test");
    fixture.componentInstance.signInForm.controls.password.setValue("password");
    const signInButton = await loader.getHarness(MatButtonHarness.with({text: `Sign In`}));
    await signInButton.click();
    expect(fixture.componentInstance.login).toHaveBeenCalled();
  });

  it(`should render urt to register`, async () => {
    //var registerUrl = await loader.getHarness(MatButtonHarness.with({selector: `a[href='/register']`}));
    const registerUrl =  fixture.debugElement.queryAll(By.css(`a[href='/register']`));
    expect(registerUrl.length).toBeGreaterThan(0);
  });

});
