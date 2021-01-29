import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { DeleteAccountDialogComponent } from './delete-account-dialog.component';

describe('DeleteAccountDialogComponent', () => {
  let component: DeleteAccountDialogComponent;
  let fixture: ComponentFixture<DeleteAccountDialogComponent>;
  const currentUserSource = new ReplaySubject<User | null>(1);
  currentUserSource.next(null);
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    [`delete`]
  );
  let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', [
    'navigateByUrl',
  ]);
  let snackBarSpy: jasmine.SpyObj<MatSnackBar> = jasmine.createSpyObj(
    'MatSnackBar',
    ['open']
  );
  let dialogSpy: jasmine.SpyObj<
    MatDialogRef<DeleteAccountDialogComponent>
  > = jasmine.createSpyObj<MatDialogRef<DeleteAccountDialogComponent>>(
    `MatDialogRef<DeleteAccountDialogComponent>`,
    [`close`]
  );
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialogRef, useValue: dialogSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();
    TestBed.inject(Router);
    TestBed.inject(AuthService);
    fixture = TestBed.createComponent(DeleteAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#deleteAccount should call delete method on AuthService`, () => {
    authServiceSpy.delete.and.returnValue(of());
    component.deleteAccount();
    expect(authServiceSpy.delete).toHaveBeenCalled();
  });

  it(`#deleteAccount should redirect to home`, () => {
    authServiceSpy.delete.and.returnValue(
      of(new HttpResponse({ statusText: `Ok` }) as unknown) as Observable<void>
    );
    component.deleteAccount();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`/`);
  });

  it(`#deleteAccount should close the dialog`, () => {
    authServiceSpy.delete.and.returnValue(
      of(new HttpResponse({ statusText: `Ok` }) as unknown) as Observable<void>
    );
    component.deleteAccount();
    expect(dialogSpy.close).toHaveBeenCalled();
  });

  it('should render Yes button that calls deleteAccount method', async () => {
    let button = await loader.getHarness(
      MatButtonHarness.with({ text: new RegExp('Yes') })
    );
    expect(button).toBeTruthy();
    spyOn(component, `deleteAccount`);
    await button.click();
    expect(component.deleteAccount).toHaveBeenCalled();
  });

  it('should render Cancel button that closes dialog', async () => {
    let button = await loader.getHarness(
      MatButtonHarness.with({ text: new RegExp('Cancel') })
    );
    expect(button).toBeTruthy();
  });
});
