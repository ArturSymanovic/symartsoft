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

describe('NavComponent', () => {
  let fixture: ComponentFixture<NavComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        RouterTestingModule,
        HttpClientModule,
        MaterialsModule,
      ],
      declarations: [NavComponent],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(NavComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should render toolbar`, async () => {
    const toolbar = await loader.getHarness(MatToolbarHarness);
    expect(toolbar).toBeTruthy();
  });

  it(`should render the link to home`, () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('href'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/';
      })
    ).not.toEqual(-1);
  });

  it(`should render the link to blog`, () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('href'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/blog';
      })
    ).not.toEqual(-1);
  });

  it(`should render the link to sign in if there is no current user`, () => {
    fixture.componentInstance.authService.setCurrentUser(null);
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

  it(`should render the button to sign out if user is logged in`, () => {
    fixture.componentInstance.authService.setCurrentUser({
      email: 'test',
      token: 'test',
    });
    fixture.detectChanges();
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.innerText);
    expect(
      hrefs.findIndex((l: string) => {
        return l.includes('SIGN OUT');
      })
    ).not.toEqual(-1);
  });

  it(`sign out button should call auth service logout method`, () => {
    spyOn(fixture.componentInstance.authService, 'logout');
    fixture.componentInstance.authService.setCurrentUser({
      email: 'test',
      token: 'test',
    });
    fixture.detectChanges();
    let href: HTMLElement = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement)
      .filter((l) => {
        return l.innerText.includes('SIGN OUT');
      })[0];
    href.click();
    expect(fixture.componentInstance.authService.logout).toHaveBeenCalled();
  });
});
