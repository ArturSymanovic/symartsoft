import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialsModule } from 'src/app/_modules/materials/materials.module';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let loader: HarnessLoader;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialsModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [RegisterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it(`#sign in button should call login method`, async () => {
    spyOn(fixture.componentInstance, 'register');
    fixture.componentInstance.registerForm.controls.email.setValue('test@test');
    fixture.componentInstance.registerForm.controls.password.setValue(
      'password'
    );
    const registerButton = await loader.getHarness(
      MatButtonHarness.with({ text: `Register` })
    );
    await registerButton.click();
    expect(fixture.componentInstance.register).toHaveBeenCalled();
  });
});
