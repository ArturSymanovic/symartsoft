import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/_services/auth.service';
import { MaterialsModule } from 'src/app/_modules/materials/materials.module';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { User } from 'src/app/_models/user';
import { ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const userStub: User | null = {
  email: 'test1@example.com',
  token: 'testToken',
};

describe('NavComponent', () => {
  let fixture: ComponentFixture<NavComponent>;
  let loader: HarnessLoader;
  let component: NavComponent;
  const currentUserSource = new ReplaySubject<User | null>(1);
  currentUserSource.next(null);
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    [`logout`],
    { currentUser$: currentUserSource.asObservable() }
  );
  let snackbarSpy: jasmine.SpyObj<MatSnackBar> = jasmine.createSpyObj(
    'MatSnackBar',
    ['open']
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialsModule],
      declarations: [NavComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render toolbar`, async () => {
    const toolbar = await loader.getHarness(MatToolbarHarness);
    expect(toolbar).toBeTruthy();
  });

  it(`should render the link to home`, async () => {
    if (component.showMobileMenu) {
      const menuHarness = await loader.getHarness(
        MatMenuHarness.with({ triggerText: `menu` })
      );
      await menuHarness.open();
    }
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/';
      })
    ).not.toEqual(-1);
  });

  it(`should render the link to blog`, async () => {
    if (component.showMobileMenu) {
      const menuHarness = await loader.getHarness(
        MatMenuHarness.with({ triggerText: `menu` })
      );
      await menuHarness.open();
    }
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/blog';
      })
    ).not.toEqual(-1);
  });

  it(`should render the link to manage-privacy`, async () => {
    const menuHarness = await loader.getHarness(
      MatMenuHarness.with({ triggerText: `settings` })
    );
    await menuHarness.open();
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/manage-privacy';
      })
    ).not.toEqual(-1);
  });

  it(`should render the link to contact us`, async () => {
    const menuHarness = await loader.getHarness(
      MatMenuHarness.with({ triggerText: `settings` })
    );
    await menuHarness.open();
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/contact';
      })
    ).not.toEqual(-1);
  });

  it(`should render the link to sign in if there is no logged in user`, async () => {
    const menuHarness = await loader.getHarness(
      MatMenuHarness.with({ triggerText: `account_circle` })
    );
    await menuHarness.open();
    fixture.detectChanges();
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('href'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/signin';
      })
    ).not.toEqual(-1);
  });
});

describe('NavComponent', () => {
  let fixture: ComponentFixture<NavComponent>;
  let loader: HarnessLoader;
  let component: NavComponent;
  const currentUserSource = new ReplaySubject<User | null>(1);
  currentUserSource.next(userStub);
  let authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'AuthService',
    [`logout`],
    { currentUser$: currentUserSource.asObservable() }
  );
  let snackbarSpy: jasmine.SpyObj<MatSnackBar> = jasmine.createSpyObj(
    'MatSnackBar',
    ['open']
  );
  let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', [
    'navigateByUrl',
  ]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsModule],
      declarations: [NavComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it(`should render the link to sign out if there is logged in user`, async () => {
    const menuHarness = await loader.getHarness(
      MatMenuHarness.with({ triggerText: `account_circle` })
    );
    await menuHarness.open();
    fixture.detectChanges();
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.innerText);
    expect(
      hrefs.findIndex((l: string) => {
        return l.toLowerCase().includes('sign out');
      })
    ).not.toEqual(-1);
  });

  it(`should render user's email if there is logged in user`, async () => {
    const menuHarness = await loader.getHarness(
      MatMenuHarness.with({ triggerText: `account_circle` })
    );
    await menuHarness.open();
    fixture.detectChanges();
    let hrefs = fixture.debugElement
      .queryAll(By.css('span'))
      .map((l) => l.nativeElement.innerText);
    expect(
      hrefs.findIndex((l: string) => {
        return l.toLowerCase().includes(userStub.email);
      })
    ).not.toEqual(-1);
  });

  it(`should render link to account settings if there is logged in user`, async () => {
    const menuHarness = await loader.getHarness(
      MatMenuHarness.with({ triggerText: `account_circle` })
    );
    await menuHarness.open();
    fixture.detectChanges();
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/account-settings';
      })
    ).not.toEqual(-1);
  });

  it(`logout anchor should call logout method`, async () => {
    const menuHarness = await loader.getHarness(
      MatMenuHarness.with({ triggerText: `account_circle` })
    );
    await menuHarness.open();
    let hrefs: HTMLElement[] = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement);

    const logoutHref: HTMLElement | undefined = hrefs.find((l) => {
      return l.innerText.toLowerCase().includes('sign out');
    });
    spyOn(component, 'logout');
    if (logoutHref) {
      logoutHref.click();
    }
    expect(component.logout).toHaveBeenCalled();
  });

  it(`logout method should call auth service logout method, display snackbar and route to home`, () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(snackbarSpy.open).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`/`);
  });
});
